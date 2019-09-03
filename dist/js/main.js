"use strict";

// Write number of Twitterstorians to the DOM
var numSpan = document.getElementById('num');
var container = document.querySelector('.t-main');
numSpan.innerText = container.childElementCount; // Filter DIVS based on text

var numTwitter = document.querySelectorAll('.t-entry');
var searchBox = document.querySelector('.t-search-box');
var searchResults = document.getElementById('t-search-results');
searchBox.addEventListener("keyup", function () {
  if (searchBox.value.length > 2) {
    divFilter(searchBox.value);
    var results = document.querySelectorAll('.t-match').length;
    searchResults.textContent = "Results: ".concat(results.toString());
  } else {
    numTwitter.forEach(function (el) {
      return el.classList.remove('t-no-match');
    });
    searchResults.textContent = '';
  }

  ;
});

function divFilter(input) {
  numTwitter.forEach(function (el) {
    var escInput = escapeRegExp(input);
    var userInput = RegExp(escInput.toLowerCase());
    var src = el.querySelector('.t-name').innerText.toLowerCase();
    var bios = el.querySelector('.t-bio').innerText.toLowerCase();

    if (userInput.test(src) || userInput.test(bios)) {
      el.classList.add('t-match');
      el.classList.remove('t-no-match');
    } else {
      el.classList.add('t-no-match');
      el.classList.remove('t-match');
    }
  });
} // Escape special characters on user input


function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
} // Open and close button for cards


var aboutButtons = document.querySelectorAll('.t-about');
var closeBioButtons = document.querySelectorAll('.t-bio-close');
var tweetButtons = document.querySelectorAll('.t-latest');
aboutButtons.forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.target.parentNode.nextSibling.nextSibling.classList.remove('t-card-hide');
    e.target.parentNode.nextSibling.nextSibling.classList.add('t-card-show');
    e.target.parentNode.style.display = "none";
    e.target.parentNode.previousElementSibling.style.display = "none";
  });
});
tweetButtons.forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.target.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.classList.remove('t-card-hide');
    e.target.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.classList.add('t-card-show');
    e.target.parentNode.style.display = "none";
    e.target.parentNode.previousElementSibling.style.display = "none";
  });
});
closeBioButtons.forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.target.parentNode.classList.remove('t-card-show');
    e.target.parentNode.classList.add('t-card-hide');
    e.target.parentNode.parentNode.children[1].style.display = "flex";
    e.target.parentNode.parentNode.children[2].style.display = "flex";
  });
});