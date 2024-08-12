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

  document.querySelector("#description").value = "";
  document.querySelector("#amount").value = "";
  //   refreshTable();
}

function addLine(rec) {
  let str = "";

  if (rec.actionType == "income") {
    str = ` <tr>
                <td>${rec.description}</td>
                <td>${rec.amount}</td>
                <td>
                  <i class="fa-regular fa-pen-to-square text-success" onclick="UpdateAction(${rec.id})" ></i>
                </td>
                <td><i class="fa-solid fa-trash-can text-success" onclick="deleteAction(${rec.id})" ></i></td>
              </tr>`;
  } else {
    str = ` <tr>
    <td class="text-danger">${rec.description}</td>
    <td class="text-danger">${rec.amount * -1}</td>
    <td class="text-danger">
      <i class="fa-regular fa-pen-to-square" onclick="UpdateAction(${
        rec.id
      })" ></i>
    </td class="text-danger">
    <td><i class="fa-solid fa-trash-can" onclick="deleteAction(${
      rec.id
    })"></i></td>
  </tr>`;
  }
  return str;

  // data-bs-toggle="modal" data-bs-target="#changeModalWindows"
  // data-bs-toggle="modal" data-bs-target="#changeModalWindows"
}

window.deleteAction = function deleteAction(id) {
  actionA.deleteAction(id);
  refreshTable();
};
window.UpdateAction = function updateAction(id) {
  document.querySelector("#recID").innerText = id;
  var myModal = new bootstrap.Modal(
    document.getElementById("changeModalWindows")
  );
  myModal.show();
};

window.completeUpdateAction = function completeUpdateAction() {
  const newAmount = document.querySelector("#amount-update").value;
  const id = document.querySelector("#recID").innerText;
  actionA.updateAction(id, newAmount);
  refreshTable();
};

window.calcBalance = function calcBalance() {
  let balance = actionA.calcBalance();
  document.querySelector("#balance").innerText = "$" + balance;
};

function refreshTable(arr = actionA.actionArray) {
  const line = document.querySelector("#table-lines");
  let rec;
  line.innerHTML = "";
  for (rec of arr) {
    line.innerHTML += addLine(rec);
  }
  calcBalance();
}

window.addAction = function addAction() {
  const typeActionF = document.querySelector("#typeAction");
  const descriptionF = document.querySelector("#description");
  const amountF = document.querySelector("#amount");
  actionA.addAction(typeActionF.value, descriptionF.value, amountF.value);
  refreshTable();
  document.querySelector("#description").value = "";
  document.querySelector("#amount").value = "";
};

window.filterIncome = function filterIncome() {
  let rec;
  const line = document.querySelector("#table-lines");
  const arr = [...actionA.actionArray].filter(
    (rec) => rec.actionType == "income"
  );

  line.innerHTML = "";

  for (rec of arr) {
    line.innerHTML += addLine(rec);
  }
};
window.filterExpense = function filterExpense() {
  let rec;
  const line = document.querySelector("#table-lines");
  const arr = [...actionA.actionArray].filter(
    (rec) => rec.actionType == "expense"
  );

  line.innerHTML = "";

  for (rec of arr) {
    line.innerHTML += addLine(rec);
  }
};

window.nofilter = function nofilter() {
  refreshTable();
};
window.sortAmountType = function sortAmountType() {};
window.sortAmount = function sortAmount() {};
window.saving = function saving() {};
window.loading = function loading() {};

function init() {
  actionA = new ActionManager();

  addTestData();
}

init();
