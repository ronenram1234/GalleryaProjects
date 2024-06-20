"use strict";

console.log("gallery.js start");
// emphasize menue item when mouse hoover over
const navM = document.querySelector(".navM");

const handleHover = function (e) {
  if (e.target.classList.contains("menueItem")) {
    const link = e.target;
    console.log(e);
    const siblings = link.closest(".navM").querySelectorAll(".menueItem");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
        console.log(el);
      }
    });
  }
};

navM.addEventListener("mouseover", handleHover.bind(0.5));
navM.addEventListener("mouseout", handleHover.bind(1));

///////////////////////////////////
