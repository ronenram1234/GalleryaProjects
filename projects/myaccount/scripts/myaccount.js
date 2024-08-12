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

function updateFilterButton(button) {
  const buttons = document.querySelectorAll(".filter");
  buttons.forEach((btn) => {
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-secondary");
  });

  // Add 'btn-primary' class to the clicked button and remove 'btn-secondary'
  button.classList.add("btn-primary");
  button.classList.remove("btn-secondary");
}

function filltable(arr) {
  const line = document.querySelector("#table-lines");
  let rec;
  line.innerHTML = "";
  for (rec of arr) {
    line.innerHTML += addLine(rec);
  }
}

window.filterIncome = function filterIncome(button) {
  const arr = [...actionA.actionArray].filter(
    (rec) => rec.actionType == "income"
  );
  filltable(arr);
  updateFilterButton(button);
};

window.filterExpense = function filterExpense(button) {
  const arr = [...actionA.actionArray].filter(
    (rec) => rec.actionType == "expense"
  );
  filltable(arr);
  updateFilterButton(button);
};

window.nofilter = function nofilter(button) {
  refreshTable();
  updateFilterButton(button);
};
window.sortAmountType = function sortAmountType() {
  const arr = [...actionA.actionArray].sort((recA, recB) =>
    recA.actionType.toLowerCase().localeCompare(recB.actionType.toLowerCase())
  );
  filltable(arr);
};
window.sortAmount = function sortAmount() {
  const arr = [...actionA.actionArray].sort((recA, recB) => {
    let a = recA.amount * (recA.actionType == "expense" ? -1 : 1);
    let b = recB.amount * (recB.actionType == "expense" ? -1 : 1);
    return a - b;
  });
  filltable(arr);
};
function cleanLocalHost() {
  let length = localStorage.length;
  for (let i = 0; i < length; i++) {
    const key = localStorage.key(0);
    console.log(key);
    if (key.startsWith("myaccount")) {
      console.log(key);
      localStorage.removeItem(key);
    }
  }
}

window.saving = function saving() {
  cleanLocalHost();
  for (let action of actionA.actionArray) {
    // task = tM.taskArray[ind];

    localStorage.setItem(`myaccount${action.id}`, JSON.stringify(action));
  }
};
window.loading = function loading() {
  actionA.actionArray = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("myaccount")) {
      const rec = JSON.parse(localStorage.getItem(key));
      actionA.actionArray.push(rec);
    }
  }
  refreshTable();
};

function init() {
  actionA = new ActionManager();

  addTestData();
}

init();
