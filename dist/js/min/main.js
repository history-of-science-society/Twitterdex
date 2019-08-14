"use strict";

// Write number of Twitterstorians to the DOM
var numSpan = document.getElementById('num');
var numTwitter = document.querySelectorAll('.t-entry');
numSpan.innerText = numTwitter.length; // Filter DIVS based on text

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
    var userInput = RegExp(input.toLowerCase());
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
}

var sortButton = document.getElementById('a-z');
var twitterArray = [];
numTwitter.forEach(function (el) {
  return twitterArray.push(el);
});
sortButton.addEventListener('click', function () {
  var container = document.querySelector('.t-main');

  sortButton.classList.toggle('z-a');

  if (sortButton.classList.contains('z-a')) {
    sortButton.innerHTML = 'A&nbsp;&ndash;&nbsp;Z'; // numTwitter.sort()

    twitterArray.sort(function (a, b) {
      var twitA = a.dataset.id.toLowerCase();
      var twitB = b.dataset.id.toLowerCase();

      if (twitA > twitB) {
        return -1;
      } else if (twitA < twitB) {
        return 1;
      } else {
        return 0;
      }
    });
    twitterArray.forEach(function (el) {
      container.append(el);
    });
  } else {
    sortButton.innerHTML = 'Z&nbsp;&ndash;&nbsp;A';
    twitterArray.sort(function (a, b) {
      var twitA = a.dataset.id.toLowerCase();
      var twitB = b.dataset.id.toLowerCase();

      if (twitA < twitB) {
        return -1;
      } else if (twitA > twitB) {
        return 1;
      } else {
        return 0;
      }
    });
    twitterArray.forEach(function (el) {
      container.append(el);
    });
  }
});
var aboutButtons = document.querySelectorAll('.t-about');
var closeBioButtons = document.querySelectorAll('.t-bio-close');
var tweetButtons = document.querySelectorAll('.t-latest');
aboutButtons.forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.target.parentNode.nextSibling.nextSibling.classList.remove('t-card-hide');
    e.target.parentNode.nextSibling.nextSibling.classList.add('t-card-show');
  });
});
tweetButtons.forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.target.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.classList.remove('t-card-hide');
    e.target.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.classList.add('t-card-show');
  });
});
closeBioButtons.forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.target.parentNode.classList.remove('t-card-show');
    e.target.parentNode.classList.add('t-card-hide');
  });
});