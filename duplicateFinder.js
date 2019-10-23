const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

// Formstack variables
const formId = '3315786';
const oauth_token = process.env.API_FS;

async function start() {
    let data = [];

    // Get number of pages of all responses
    const pageNos = await getPageNos();

    // Loop through pages to get all responses and add them to array
    for (let i = 1; i <= pageNos; i++) {
        let raw = await fetch(`https://www.formstack.com/api/v2/form/${formId}/submission.json?page=${i}&data=1&oauth_token=${oauth_token}`)
        let res = await raw.json();
        data.push(res.submissions);
    }

    // Flatten responses into one array.
    const flattenedArr = data.reduce((acc, cv) => acc.concat(cv), []);

    // Create an Array of Twitter URLs to do a basic check for duplicate accounts
    const urlCheck = [];
    flattenedArr.forEach(item => urlCheck.push(item.data[73001016].value));

    // Checks for duplicates. Works because indexOf returns the first index of item. So, if there are two of the same item, one will not equal that index. In this case, the duplicate that is flagged will be the older one (and likely the one to be deleted) because its index will not equal that of the newer one, which will be returned by indexOf
    let duplicates = urlCheck.filter((item, index) => urlCheck.indexOf(item) != index);

    // The problem with the duplicate finder is that it is restricted in this form to dealing with arrays, so it can't return additional data about the item. So, here I recreate an array of objects that includes info useful for pointing out which entries are duplicates. In the future, deletion could be automated by making a request to the server to delete these entries. For now they are just logged to the console.
    let dupeIndexArr = [];
    duplicates.forEach(item => {
        const index = urlCheck.indexOf(item);
        const id = flattenedArr[index].id;
        const name = flattenedArr[index].data[73000979].value;
        const firstName = name.match(/\s(\w+)\n/);
        const lastName = name.match(/\s\w+$/);

        dupeIndexArr.push({
            index,
            id,
            'name': firstName[1] + lastName[0]
        })
    })

    if (dupeIndexArr.length === 0) {
        console.log('No duplicates found!');
    } else {
        console.log(dupeIndexArr);
    }
}

start();

function getPageNos() {
    return new Promise(resolve => {
        fetch(`https://www.formstack.com/api/v2/form/${formId}/submission.json?oauth_token=${oauth_token}`)
            .then(response => response.json())
            .then(myJson => resolve(myJson.pages))
    })
}