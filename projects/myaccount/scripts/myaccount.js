"use strict";

import ActionManager from "./actionmanager.js";

var actionA = [];

function addTestData() {
  const typeActionF = document.querySelector("#typeAction");
  const descriptionF = document.querySelector("#description");
  const amountF = document.querySelector("#amount");

  typeActionF.value = "income";
  descriptionF.value = "Salary";
  amountF.value = 1000;

  addAction();
  typeActionF.value = "expense";
  descriptionF.value = "Grocery store";
  amountF.value = 700;

  addAction();
  typeActionF.value = "income";
  descriptionF.value = "Return product";
  amountF.value = 400;

  addAction();
  typeActionF.value = "expense";
  descriptionF.value = "Gas";
  amountF.value = 550;

  addAction();
  typeActionF.value = "expense";
  descriptionF.value = "Insurance";
  amountF.value = 330;

  addAction();
  typeActionF.value = "income";
  descriptionF.value = "Salary";
  amountF.value = 3500;

  addAction();

  document.querySelector("#description").value=""
  document.querySelector("#amount").value=""
  refreshTable();
}

function addLine(rec) {
  let str = "";

  if (rec.actionType == "income") {
    str = ` <tr>
                <td>${rec.description}</td>
                <td>${rec.amount}</td>
                <td>
                  <i class="fa-regular fa-pen-to-square text-success"></i>
                </td>
                <td><i class="fa-solid fa-trash-can text-success"></i></td>
              </tr>`;
  } else {
    str = ` <tr>
    <td class="text-danger">${rec.description}</td>
    <td class="text-danger">${rec.amount * -1}</td>
    <td class="text-danger">
      <i class="fa-regular fa-pen-to-square"></i>
    </td class="text-danger">
    <td><i class="fa-solid fa-trash-can"></i></td>
  </tr>`;
  }
  return str;
}

window.calcBalance=function calcBalance(){
    let balance=actionA.calcBalance()
    document.querySelector("#balance").innerText='$'+balance
}

function refreshTable() {
  const line = document.querySelector("#table-lines");
  let rec
  line.innerHTML = "";
  for (rec of actionA.actionArray) {
    line.innerHTML += addLine(rec);
  }
}

window.addAction = function addAction() {
  const typeActionF = document.querySelector("#typeAction");
  const descriptionF = document.querySelector("#description");
  const amountF = document.querySelector("#amount");
  actionA.addAction(typeActionF.value, descriptionF.value, amountF.value);
};

function init() {
  actionA = new ActionManager();

    addTestData();
    calcBalance()
}

init();
