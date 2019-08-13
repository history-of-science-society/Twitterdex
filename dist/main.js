// Write number of Twitterstorians to the DOM
const numSpan = document.getElementById('num');
const numTwitter = document.querySelectorAll('.t-entry');


numSpan.innerText = numTwitter.length;

// Filter DIVS based on text
const searchBox = document.querySelector('.t-search-box');
const searchResults = document.getElementById('t-search-results');

searchBox.addEventListener("keyup", () => {
    if (searchBox.value.length > 3) {
        divFilter(searchBox.value);
        let results = document.querySelectorAll('.t-match').length;
        searchResults.textContent = `Results: ${results.toString()}`;
    } else {
        numTwitter.forEach(el => el.classList.remove('t-no-match'));
        searchResults.textContent = '';
    };
})

function divFilter(input) {
    numTwitter.forEach(el => {
        let userInput = RegExp(input.toLowerCase());
        let src = el.querySelector('.t-name').innerText.toLowerCase();
        let bios = el.querySelector('.t-bio').innerText.toLowerCase();
        if (userInput.test(src) || userInput.test(bios)) {
            el.classList.add('t-match');
            el.classList.remove('t-no-match');
        } else {
            el.classList.add('t-no-match');
            el.classList.remove('t-match');
        }
    })
}

const sortButton = document.getElementById('a-z');
const twitterArray = [];
numTwitter.forEach(el => twitterArray.push(el));
sortButton.addEventListener('click', () => {
    const container = document.querySelector('.t-main');
    sortButton.classList.toggle('z-a');

    if (sortButton.classList.contains('z-a')) {
        sortButton.innerHTML = 'A&nbsp;&ndash;&nbsp;Z';
        // numTwitter.sort()

        twitterArray.sort(function (a, b) {
            let twitA = a.dataset.id.toLowerCase();
            let twitB = b.dataset.id.toLowerCase();

            if (twitA > twitB) {
                return -1;
            } else if (twitA < twitB) {
                return 1;
            } else {
                return 0;
            }
        })

        twitterArray.forEach(el => {
            container.append(el);
        })

    } else {
        sortButton.innerHTML = 'Z&nbsp;&ndash;&nbsp;A';

        twitterArray.sort(function (a, b) {
            let twitA = a.dataset.id.toLowerCase();
            let twitB = b.dataset.id.toLowerCase();

            if (twitA < twitB) {
                return -1;
            } else if (twitA > twitB) {
                return 1;
            } else {
                return 0;
            }
        })

        twitterArray.forEach(el => {
            container.append(el);
        })
    }

})

const aboutButtons = document.querySelectorAll('.t-about');
const closeBioButtons = document.querySelectorAll('.t-bio-close');
const tweetButtons = document.querySelectorAll('.t-latest');

aboutButtons.forEach(el => {
    el.addEventListener('click', e => {
        e.target.parentNode.nextSibling.nextSibling.classList.remove('t-card-hide');
        e.target.parentNode.nextSibling.nextSibling.classList.add('t-card-show');
    })
});

tweetButtons.forEach(el => {
    el.addEventListener('click', e => {
        console.log(e.target.parentNode.nextSibling);

        e.target.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.classList.remove('t-card-hide');
        e.target.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.classList.add('t-card-show');
    })
});

closeBioButtons.forEach(el => {
    el.addEventListener('click', e => {
        e.target.parentNode.classList.remove('t-card-show');
        e.target.parentNode.classList.add('t-card-hide');
    })
});