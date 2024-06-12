"use strict";

function init() {
  let arr = document.querySelectorAll("button");
  console.log(arr);
}


document.addEventListener('mousedown', function(event) {
    // Check which key was pressed
    if (event.key === '1') {
        // Handle key 1
        console.log('Key 1 was pressed');
    } else if (event.key === '2') {
        // Handle key 2
        console.log('Key 2 was pressed');
    }
    
    console.log(event.target);
    console.log(event.target.type.button);
    console.log(event.target.querySelectorAll("button").dataset.tab);
    
    // Add similar checks for other keys (3, 4, etc.)
});


// function keyClicked(element){
//     console.log('keyclicked');
//     // console.log(element.getAttribute('data-id'));
//     console.log(element.getAttribute('data-key'));
//     // console.log(element.keyClicked);
//     // console.log(element);
    
// }

init();
