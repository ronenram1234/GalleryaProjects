"use strict";

const itemName = document.querySelector("#itemName");
const itemPrice = document.querySelector("#itemPrice");
const itemCategory = document.querySelector("#itemCategory");
const description = document.querySelector("#description");
const grade = document.querySelector("#grade");

const inStock = document.querySelector("#inStockYes");
const tableLine = document.querySelector("#tableLine");



function createNewRow(name, price, category, description, grade, availability) {

  var newRow = document.createElement("div");
  newRow.className = "row g-1 allTable";
  
  newRow.innerHTML = `
      <div class="col col-md-2">${name}</div>
      <div class="col col-md-2">${price}</div>
      <div class="col col-md-2">${category}</div>
      <div class="col col-md-2">${description}</div>
      <div class="col col-md-2">${grade}</div>
      <div class="col col-md-2">${availability}</div>
    `;


  document.querySelector("#tableLine").appendChild(newRow);
}

function addNewLine() {
  let price = Number(itemPrice.value);
  console.log(tableLine.innerHTML);
  

  if (itemName.value != "" && price != 0) {
    

    createNewRow(
      itemName.value,
      itemPrice.value,
      itemCategory.value,
      description.value,
      grade.value,
      inStock.checked
    );
    document.getElementById('formID').reset();


  } else {
    alert("Item name and Price are required");
  }
}
