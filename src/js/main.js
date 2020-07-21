// Escape special characters on user input
function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// Search functionality

// DOM Elements
const ul = document.querySelector(".t-main");
const twitterstorians = ul.querySelectorAll("li");
const searchInput = document.getElementById("search");
const resultNum = document.getElementById("results");

// Return result number
const parseResult = (num) => {
  if (num === 1) {
    return num + " Result";
  }
  return num + " Results";
};

// Create a text blob to search through
const searchIndex = Array.from(twitterstorians).map((el) => {
  const id = el.id;
  const text =
    id +
    " " +
    el.dataset.name +
    " " +
    el.dataset.bio +
    " " +
    el.dataset.affiliation +
    " " +
    el.dataset.tweet;
  const lowerCaseText = text.toLowerCase();
  return { id, text: lowerCaseText };
});

const clearNoResultsDiv = () => {
  const noResults = document.getElementById("no-results");
  if (noResults) noResults.parentNode.removeChild(noResults);
};

const reset = () => {
  twitterstorians.forEach((el) => (el.style.display = "flex"));
  clearNoResultsDiv();
  resultNum.textContent = parseResult(twitterstorians.length);
};

const search = (e) => {
  // reset on backspace
  if (e.key === "Backspace" || e.code === "Backspace") {
    reset();
    //   return;
  }

  // If there are results, remove the "no results" div
  clearNoResultsDiv();

  // Prepare search value
  const searchValue = escapeRegExp(
    searchInput.value.toString().trim().toLowerCase()
  );

  // Reset if value is less than 2
  if (searchValue.length < 2) {
    reset();
  } else {
    // Begin search
    const searchRegEx = RegExp(searchValue);
    const searchResults = searchIndex
      .filter((el) => searchRegEx.test(el.text))
      .map((el) => el.id);
    // If results are returned
    if (searchResults.length) {
      resultNum.textContent = parseResult(searchResults.length);
      // Update display to match results
      twitterstorians.forEach((el) => {
        if (!searchResults.includes(el.id)) {
          el.style.display = "none";
        }
      });
      // Hide everything if no results are returned
    } else {
      twitterstorians.forEach((el) => {
        el.style.display = "none";
      });
      // If there are no results, add element
      if (!document.getElementById("no-results")) {
        resultNum.textContent = parseResult(0);
        const noResults = document.createElement("li");
        noResults.id = "no-results";
        noResults.classList.add("t-entry");
        noResults.textContent = "Nothing found! Try again";
        ul.append(noResults);
      }
    }
  }
};

// Add event listener
searchInput.addEventListener("keyup", search);

// Modal Creation

ul.addEventListener("click", (e) => {
  if (e.target.tagName === "UL") {
    return;
  }
  const targetItem = e.target.closest("li");
  const id = targetItem.id;
  const name = targetItem.dataset.name;
  const affiliation = targetItem.dataset.affiliation;
  const bio = targetItem.dataset.bio;
  const tweet = targetItem.dataset.tweet;
  const img = targetItem.dataset.img;

  const modal = `<div class="t-modal-item" id="${id}">
                  <header class="t-modal__header">
                    <img class="t-image" src="${img}" alt="" />
                  <div>
                    <h3>${name}</h3>
                    <p class="t-affiliation">${affiliation}</p>
                  </div>
                  </header>
                  <a class="follow-link" href="https://twitter.com/${id}">
                  <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg> Follow @${id}</a>
                  <p class="t-subheader">Bio</p>
                  <p>${bio}</p>
                  <p class="t-subheader">Recent Tweet</p>
                  ${tweet}
                </div>`;

  let div = document.createElement("div");
  const btn = document.createElement("button");
  btn.innerHTML =
    '<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label="Close" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#ffffff"> <title id="cancelIconTitle">Cancel</title> <path d="M15.5355339 15.5355339L8.46446609 8.46446609M15.5355339 8.46446609L8.46446609 15.5355339"/> <path d="M4.92893219,19.0710678 C1.02368927,15.1658249 1.02368927,8.83417511 4.92893219,4.92893219 C8.83417511,1.02368927 15.1658249,1.02368927 19.0710678,4.92893219 C22.9763107,8.83417511 22.9763107,15.1658249 19.0710678,19.0710678 C15.1658249,22.9763107 8.83417511,22.9763107 4.92893219,19.0710678 Z"/> </svg>';
  btn.classList.add("close-modal-btn");

  btn.addEventListener("click", (e) => {
    const modalToClose = e.currentTarget.parentElement;
    modalToClose.parentNode.removeChild(modalToClose);
    div = null;
  });

  div.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.parentNode.removeChild(e.currentTarget);
      div = null;
    }
  });

  const closeByEsc = (e) => {
    if (e.key === "Escape" || e.code === "Escape") {
      div.parentNode.removeChild(div);
      div = null;
      document.removeEventListener("keyup", closeByEsc);
    }
  };

  document.addEventListener("keyup", closeByEsc);

  div.classList.add("t-modal");
  div.innerHTML = modal;
  div.append(btn);
  document.body.append(div);
});
