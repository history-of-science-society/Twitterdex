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

function delDupes() {

}

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
    const newData = await data.reduce((acc, cv) => acc.concat(cv), []);

    // let duplicates = await newData.filter((item, index) => newData.indexOf(item.data[73001016].value != index));
    // let duplicates = await newData.filter((item, index) => console.log(newData.indexOf(item.data[73001016].value)));


    let urlCheck = [];
    await newData.forEach(item => urlCheck.push(item.data[73001016].value));
    let duplicates = await urlCheck.filter((item, index) => urlCheck.indexOf(item) != index)
    let dupeIndexArr = [];
    let dupeIndex = await duplicates.forEach(item => {

        let index = urlCheck.indexOf(item);


        dupeIndexArr.push(index);


    })
    console.log(dupeIndexArr);
}

start();