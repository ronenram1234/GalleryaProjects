"use strict";

const itemName = document.querySelector("#itemName");
const itemPrice = document.querySelector("#itemPrice");
const itemCategory = document.querySelector("#itemCategory");
const description = document.querySelector("#description");
const grade = document.querySelector("#grade");
const nameP = document.querySelector("#itemName");
const inStock = document.querySelector("#inStockYes");
const tableLine = document.querySelector("#tableLine")
const allTable = document.querySelector("#allTable")
// const inStockNo= document.querySelector("#inStockNo")

function addNewLine() {
  let price = Number(itemPrice.value);


  console.log(tableLine.innerHTML);
  console.log(allTable.innerHTML);
  allTable.innerHTML+=`     <div class="row g-1" id="tableLine">
        <div class="col col-md-2">Name</div>
        <div class="col col-md-2">Price</div>
        <div class="col col-md-2">Category</div>
        <div class="col col-md-2">Description</div>
        <div class="col col-md-2">Grade</div>
        <div class="col col-md-2">Availability</div>
      </div>`
  allTable.innerHTML+=`     <div class="row g-1" id="tableLine">
        <div class="col col-md-2">Name</div>
        <div class="col col-md-2">Price</div>
        <div class="col col-md-2">Category</div>
        <div class="col col-md-2">Description</div>
        <div class="col col-md-2">Grade</div>
        <div class="col col-md-2">Availability</div>
      </div>`
  allTable.innerHTML+=`     <div class="row g-1" id="tableLine">
        <div class="col col-md-2">Name</div>
        <div class="col col-md-2">Price</div>
        <div class="col col-md-2">Category</div>
        <div class="col col-md-2">Description</div>
        <div class="col col-md-2">Grade</div>
        <div class="col col-md-2">Availability</div>
      </div>`


  if (itemName.value != "" && price != 0) {
    // console.log(tableLine.innerHTML);
    console.log(allTable.innerHTML);
    // allTable.innerHTML=tableLine.innerHTML+tableLine.innerHTML
    // console.log(inStock.checked);
    // alert("test");



  } else {
    // alert("Item name and Price are required");
  }
}
