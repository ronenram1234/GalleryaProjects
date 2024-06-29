"use strict";

let list = [];

function addNewLine() {
  let input = document.querySelector("#itemList");
  if (input.value == "") {
    alert("please enter item");
    return;
  }

  list.push(input.value);

  document.querySelector(
    ".list-group"
  ).innerHTML += `<li class="list-group-item">${input.value}</li>`;
}
