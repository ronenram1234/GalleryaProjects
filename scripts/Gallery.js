'use strict'

console.log('gallery.js start');


const navM = document.querySelector('.navM');

const handleHover = function (e) {
    if (e.target.classList.contains('menueItem')) {
      const link = e.target;
      const siblings = link.closest('.navM').querySelectorAll('.menueItem');
      // const logo = link.closest('.nav').querySelector('img');
  
      siblings.forEach(el => {
        if (el !== link) el.style.opacity = this;
      });
      logo.style.opacity = this;
    }
  };
  


  // Passing "argument" into handler
  navM.addEventListener('mouseover', handleHover.bind(0.5));
  navM.addEventListener('mouseout', handleHover.bind(1));