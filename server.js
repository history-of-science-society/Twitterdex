const fetch = require('node-fetch');
const fs = require('fs');

const formId = '3315786';
const oauth_token = 'e05d2249d9d915d9dc9dc1728291b590';


// async function getPageNo() {
//     let response = await fetch(`https://www.formstack.com/api/v2/form/${formId}/submission.json?oauth_token=${oauth_token}`);
//     let data = await response.json();
//     return data.pages;
// }

// function showPageNo() {
//     getPageNo().then(result => console.log(result));
// }

// showPageNo();


let twitterstorians = [];

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
        }
    }

    fs.writeFile('./stream.json', JSON.stringify(twitterstorians), err => console.log(err));

}

start();

function Twitterstorian(name, affiliation, twitter, bio) {
    this.name = nameParse(name);
    this.affiliation = affiliation;
    this.twitter = twitter;
    this.bio = bio;
}

function nameParse(input) {
    let firstName = input.match(/=\s(.+)\n/);
    let lastName = input.match(/last\s=\s(.+)/);
    console.log(firstName, lastName);
    return firstName[1].trim().toLowerCase().replace(/\w/, x => x.toUpperCase()) + " " + lastName[1].trim().toLowerCase().replace(/\w/, x => x.toUpperCase());
}