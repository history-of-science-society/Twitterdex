"use strict";function escapeRegExp(e){return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")}var aboutButtons=document.querySelectorAll(".t-about"),closeBioButtons=document.querySelectorAll(".t-bio-close");aboutButtons.forEach(function(e){e.addEventListener("click",function(e){e.target.parentNode.nextSibling.nextSibling.classList.remove("t-card-hide"),e.target.parentNode.nextSibling.nextSibling.classList.add("t-card-show"),e.target.parentNode.style.display="none",e.target.parentNode.previousElementSibling.style.display="none"})}),closeBioButtons.forEach(function(e){e.addEventListener("click",function(e){e.target.parentNode.classList.remove("t-card-show"),e.target.parentNode.classList.add("t-card-hide"),e.target.parentNode.parentNode.children[1].style.display="flex",e.target.parentNode.parentNode.children[2].style.display="flex"})});var ul=document.querySelector(".t-main");ul.addEventListener("click",function(e){if("UL"!==e.target.tagName){var t=e.target.closest("li"),n=t.id,a=t.dataset.name,c=t.dataset.affiliation,o=t.dataset.bio,r=t.dataset.tweet,d=t.dataset.img,i='<div class="t-modal-item" id="'.concat(n,'">\n                  <header class="t-modal__header">\n                    <img class="t-image" src="').concat(d,'" alt="" />\n                  <div>\n                    <h3>').concat(a,'</h3>\n                    <p class="t-affiliation">').concat(c,'</p>\n                  </div>\n                  </header>\n                  <a class="follow-link" href="https://twitter.com/').concat(n,'">\n                  <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg> Follow @').concat(n,'</a>\n                  <p class="t-subheader">Bio</p>\n                  <p>').concat(o,'</p>\n                  <p class="t-subheader">Recent Tweet</p>\n                  ').concat(r,"\n                </div>"),s=document.createElement("div"),l=document.createElement("button");l.textContent="Close",l.classList.add("close-modal-btn"),l.addEventListener("click",function(e){var t=e.currentTarget.parentElement;t.parentNode.removeChild(t),s=null}),s.addEventListener("click",function(e){e.target===e.currentTarget&&(e.currentTarget.parentNode.removeChild(e.currentTarget),s=null)});document.addEventListener("keyup",function e(t){"Escape"!==t.key&&"Escape"!==t.code||(s.parentNode.removeChild(s),s=null,document.removeEventListener("keyup",e))}),s.classList.add("t-modal"),s.innerHTML=i,s.append(l),document.body.append(s)}});