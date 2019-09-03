const fetch = require('node-fetch');
const fs = require('fs');
const Handlebars = require('handlebars');
const dotenv = require('dotenv');
dotenv.config();

// Twitter dependency
const Twit = require('twit');
const T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
    // timeout_ms: 60 * 1000
})

// Formstack variables
const formId = '3315786';
const oauth_token = process.env.API_FS;

// Set data variables
let twitterstorians = [];
let authors = {
    authors: ''
};
let newObj = {};

async function delDupes() {

}
async function start() {
    try {
        let data = [];
        // Get number of pages of all responses
        let pageNos = await fetch(`https://www.formstack.com/api/v2/form/${formId}/submission.json?oauth_token=${oauth_token}`)
            .then(response => response.json())
            .then(myJson => myJson.pages)

        // Loop through pages to get all responses and them to array
        for (let i = 1; i <= pageNos; i++) {
            let raw = await fetch(`https://www.formstack.com/api/v2/form/${formId}/submission.json?page=${i}&data=1&oauth_token=${oauth_token}`)
            let res = await raw.json();
            console.log('\x1b[32m', `Fetching form responses from the database (${i} of ${pageNos})...`);
            await data.push(res.submissions);
        }

        // Access each page of data
        for (set in data) {

            // Access individual values
            for (el in data[set]) {

                // Construct new Twitterstorian objects for all data
                let obj = new Twitterstorian(data[set][el].data[73000979].value, data[set][el].data[73000996].value, data[set][el].data[73001016].value, data[set][el].data[73001024].value);

                console.log('\x1b[32m', `Constructing object and fetching data for ${obj.name}`);

                // Get recent Tweets
                let tweetId = new Promise((resolve, reject) => {
                    T.get('statuses/user_timeline', {
                        screen_name: obj.handleRaw
                    }, function (err, data, response) {
                        if (!err) {
                            let tweetId = data[0].id_str;
                            resolve(tweetId);
                        } else {
                            console.log(response);
                            reject(err, obj.handle);
                        }
                    });
                })

                // Get profile images from Twitter
                // TODO Combine requests (this and tweetId) into one
                let profImg = new Promise((resolve, reject) => {
                    T.get('users/show', {
                        screen_name: obj.handleRaw
                    }, function (err, data, response) {
                        if (!err) {
                            let image = data.profile_image_url_https;
                            let biggerImage = image.replace('normal', 'bigger');
                            resolve(biggerImage);
                        } else {
                            reject(err, obj.handle);
                        }
                    });
                })

                // Set image profile
                obj.profile = await profImg.then(x => x);

                // Get embed code for latest tweet
                let latestTweetId = await tweetId.then(x => x);
                let encodedUrl = `https://publish.twitter.com/oembed?url=https%3A%2F%2Ftwitter.com%2F${obj.handleRaw}%2Fstatus%2F${latestTweetId}`

                let latestTweet = await fetch(encodedUrl);
                let latestTweetEmbed = await latestTweet.json();
                obj.htmlEmbed = await latestTweetEmbed.html;

                // Create data context
                await twitterstorians.push(obj);

                // Sort data by twitter handle
                await twitterstorians.sort((a, b) => {

                    let handleA = a.handle.toLowerCase();
                    let handleB = b.handle.toLowerCase();

                    if (handleA < handleB) {
                        return -1;
                    } else if (handleA > handleB) {
                        return 1;
                    } else {
                        return 0;
                    }
                })

                // Create writable data object
                newObj = await {
                    authors: twitterstorians
                }
                newObj.total = await twitterstorians.length;



            }
        }

        // Write the HTML
        fs.readFile('./src/hbs/index.hbs', function (err, data) {
            if (!err) {
                console.log('\x1b[32m', `Creating new HSS Twitterdex. A Crowd-Sourced Directory of History of Science Twitterstorians. Now with ${twitterstorians.length} Twitterstorians. Have a great day! 😄`);
                const src = data.toString();
                const template = Handlebars.compile(src);
                const html = template(newObj);
                fs.writeFile('./dist/index.html', html, err => console.log(err));
            } else {
                console.log('Error', err)
            }
        });

    } catch (error) {
        console.log(error);
    }

}

start();

// Twitterstorian object constructor
class Twitterstorian {
    constructor(name, affiliation, twitter, bio) {
        this.name = nameParse(name);
        this.affiliation = affiliation;
        this.twitter = twitter;
        this.bio = (bio.length > 144) ? bio.substring(0, 144) + "..." : bio;
        this.handle = twitterHandle(twitter);
        this.handleRaw = twitterHandleRaw(twitter);
    }
}

// Name parser
function nameParse(input) {
    const firstName = input.match(/=\s(.+)\n/);
    const lastName = input.match(/last\s=\s(.+)/);
    const name = firstName[1].trim().toLowerCase().replace(/(^\w)|\s(\w)|-(\w)/g, x => x.toUpperCase()) + " " + lastName[1].trim().toLowerCase().replace(/(^\w)|\s(\w)|-(\w)/g, x => x.toUpperCase());
    name.replace(/von|the|of|and/gi, x => x.toLowerCase());

    return name;
}

// Twitter handle parser
function twitterHandle(url) {
    try {
        const handle = (/.+\/(.+)/).exec(url);
        return `@${handle[1]}`;
    } catch (error) {
        console.error(`${url} is not valid`);
    }
}

// Twitter handle creator (without @)
// TODO Combine these functions and output one array/object
function twitterHandleRaw(url) {
    try {
        const handle = (/.+\/(.+)/).exec(url);
        return handle[1];
    } catch (error) {
        console.error(`${url} is not valid`);
    }
}