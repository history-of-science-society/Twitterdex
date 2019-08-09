const fetch = require('node-fetch');
const fs = require('fs');
const Handlebars = require('handlebars');
const dotenv = require('dotenv');
dotenv.config();
// const Twit = required('twit');

// const T = new Twit({
//     consumer_key:
//     consumer_secret:
//     access_token:
//     access_secret_token:
//     timeout_ms: 60*1000,

// })

// Formstack variables
// Should omit token before uploading
const formId = '3315786';
const oauth_token = process.env.API_FS;



// console.log(src);



let twitterstorians = [];
let authors = {
    authors: ''
};
let newObj = {};

async function start() {

    let data = [];
    // Get number of pages of all responses
    let pageNos = await fetch(`https://www.formstack.com/api/v2/form/${formId}/submission.json?oauth_token=${oauth_token}`)
        .then(response => response.json())
        .then(myJson => myJson.pages)

    // Loop through pages to get all responses and them to array
    for (let i = 1; i <= pageNos; i++) {
        let raw = await fetch(`https://www.formstack.com/api/v2/form/${formId}/submission.json?page=${i}&data=1&oauth_token=${oauth_token}`)
        let res = await raw.json();
        await data.push(res.submissions);
    }

    // Access each page of data
    for (set in data) {
        // Access individual values
        for (el in data[set]) {
            let obj = new Twitterstorian(data[set][el].data[73000979].value, data[set][el].data[73000996].value, data[set][el].data[73001016].value, data[set][el].data[73001024].value);

            await twitterstorians.push(obj);
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

            newObj = await {
                authors: twitterstorians
            }

        }
    }
    fs.readFile('./src/hbs/index.hbs', function (err, data) {
        if (!err) {
            // make the buffer into a string
            const src = data.toString();
            const template = Handlebars.compile(src);
            const html = template(newObj);
            fs.writeFile('./dist/index.html', html, err => console.log(err));
            // call the render function


        } else {
            // handle file read error
        }
    });





}

start();

function Twitterstorian(name, affiliation, twitter, bio) {
    this.name = nameParse(name);
    this.affiliation = affiliation;
    this.twitter = twitter;
    this.bio = bio;
    this.handle = twitterHandle(twitter);
    this.profile = './img/profile.jpg';
}



function nameParse(input) {
    let firstName = input.match(/=\s(.+)\n/);
    let lastName = input.match(/last\s=\s(.+)/);
    return firstName[1].trim().toLowerCase().replace(/(^\w)|\s(\w)|-(\w)/g, x => x.toUpperCase()) + " " + lastName[1].trim().toLowerCase().replace(/(^\w)|\s(\w)|-(\w)/g, x => x.toUpperCase());
}

function twitterHandle(url) {
    try {
        const handle = (/.+\/(.+)/).exec(url);
        return `@${handle[1]}`
    } catch (error) {
        console.error(`${url} is not valid`);
    }
}