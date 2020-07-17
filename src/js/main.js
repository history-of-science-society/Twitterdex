// Filter DIVS based on text
// const numTwitter = document.querySelectorAll(".t-entry");
// const searchBox = document.querySelector(".t-search-box");
// const searchResults = document.getElementById("t-search-results");

// searchBox.addEventListener("keyup", () => {
//   if (searchBox.value.length > 2) {
//     divFilter(searchBox.value);
//     let results = document.querySelectorAll(".t-match").length;
//     searchResults.textContent = `Results: ${results.toString()}`;
//   } else {
//     numTwitter.forEach((el) => el.classList.remove("t-no-match"));
//     searchResults.textContent = "";
//   }
// });

// function divFilter(input) {
//   numTwitter.forEach((el) => {
//     let escInput = escapeRegExp(input);
//     let userInput = RegExp(escInput.toLowerCase());
//     let src = el.querySelector(".t-name").innerText.toLowerCase();
//     let bios = el.querySelector(".t-bio").innerText.toLowerCase();
//     if (userInput.test(src) || userInput.test(bios)) {
//       el.classList.add("t-match");
//       el.classList.remove("t-no-match");
//     } else {
//       el.classList.add("t-no-match");
//       el.classList.remove("t-match");
//     }
//   });
// }

// Escape special characters on user input
function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// Open and close button for cards
const aboutButtons = document.querySelectorAll(".t-about");
const closeBioButtons = document.querySelectorAll(".t-bio-close");
// const tweetButtons = document.querySelectorAll('.t-latest');

aboutButtons.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.target.parentNode.nextSibling.nextSibling.classList.remove("t-card-hide");
    e.target.parentNode.nextSibling.nextSibling.classList.add("t-card-show");
    e.target.parentNode.style.display = "none";
    e.target.parentNode.previousElementSibling.style.display = "none";
  });
});

// tweetButtons.forEach(el => {
//     el.addEventListener('click', e => {
//         e.target.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.classList.remove('t-card-hide');
//         e.target.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.classList.add('t-card-show');
//         e.target.parentNode.style.display = "none";
//         e.target.parentNode.previousElementSibling.style.display = "none";
//     })
// });

closeBioButtons.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.target.parentNode.classList.remove("t-card-show");
    e.target.parentNode.classList.add("t-card-hide");
    e.target.parentNode.parentNode.children[1].style.display = "flex";
    e.target.parentNode.parentNode.children[2].style.display = "flex";
  });
});

// Modal Creation
const ul = document.querySelector(".t-main");

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
  btn.textContent = "Close";
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
