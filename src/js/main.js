// Write number of Twitterstorians to the DOM
const numSpan = document.getElementById('num');
const container = document.querySelector('.t-main');

numSpan.innerText = container.childElementCount;

// Filter DIVS based on text
const numTwitter = document.querySelectorAll('.t-entry');
const searchBox = document.querySelector('.t-search-box');
const searchResults = document.getElementById('t-search-results');

searchBox.addEventListener("keyup", () => {
    if (searchBox.value.length > 2) {
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
        let escInput = escapeRegExp(input);
        let userInput = RegExp(escInput.toLowerCase());
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

// Escape special characters on user input
function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

// Open and close button for cards
const aboutButtons = document.querySelectorAll('.t-about');
const closeBioButtons = document.querySelectorAll('.t-bio-close');
const tweetButtons = document.querySelectorAll('.t-latest');

aboutButtons.forEach(el => {
    el.addEventListener('click', e => {
        e.target.parentNode.nextSibling.nextSibling.classList.remove('t-card-hide');
        e.target.parentNode.nextSibling.nextSibling.classList.add('t-card-show');
        e.target.parentNode.style.display = "none";
        e.target.parentNode.previousElementSibling.style.display = "none";
    })
});

tweetButtons.forEach(el => {
    el.addEventListener('click', e => {
        e.target.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.classList.remove('t-card-hide');
        e.target.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.classList.add('t-card-show');
        e.target.parentNode.style.display = "none";
        e.target.parentNode.previousElementSibling.style.display = "none";
    })
});

closeBioButtons.forEach(el => {
    el.addEventListener('click', e => {
        e.target.parentNode.classList.remove('t-card-show');
        e.target.parentNode.classList.add('t-card-hide');
        e.target.parentNode.parentNode.children[1].style.display = "flex";
        e.target.parentNode.parentNode.children[2].style.display = "flex";
    })
});