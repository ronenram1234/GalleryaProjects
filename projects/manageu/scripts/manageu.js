"use strict";

import TaskManager from "./TaskManager.js";

var tM;
var filterList = 0;

function addTestData() {
  document.querySelector("#description").value = "buy food for weekend";
  addNewTask();

  document.querySelector("#description").value = "return laundry";
  addNewTask();
  tM.taskArray[1].complete = true;

  document.querySelector("#description").value = "clean car";
  addNewTask();
  tM.taskArray[2].complete = true;
  tM.taskArray[2].date.setDate(tM.taskArray[2].date.getDate() - 40);

  document.querySelector("#description").value = "clean yard";
  addNewTask();
  tM.taskArray[3].date.setDate(tM.taskArray[3].date.getDate() - 10);

  document.querySelector("#description").value = "plan birthday";
  addNewTask();
  tM.taskArray[4].date.setDate(tM.taskArray[4].date.getDate() - 50);

  document.querySelector("#description").value = "prepare cake";
  addNewTask();

  refreshList();
}

window.addNewTask = function addNewTask() {
  tM.addTask(document.querySelector("#description").value);
  refreshList();
  document.querySelector("#description").value = "";
  // console.log(tM);
};

window.completeTask = function completeTask(id) {
  tM.completeTask(id);
  refreshList();
};

window.updateTaskDescription = function updateTaskDescription(id) {
  const rec = tM.taskArray[tM.findInd(id)];
  document.querySelector("#desc-update").value = rec.description;
  document.querySelector("#recID").innerHTML = rec.id;
};

window.completeUpdateTaskDescription = function completeUpdateTaskDescription(
  id
) {
  tM.updateTaskDescription(
    document.querySelector("#recID").innerHTML,
    document.querySelector("#desc-update").value
  );
  refreshList();
};

window.deleteTask = function deleteTask(id) {
  tM.deleteTask(id);
  refreshList();
};

window.filterDate = function filterDate(str, button) {
  const buttons = document.querySelectorAll(".btn-group .filter");

  // // Remove 'btn-primary' class from all buttons and add 'btn-secondary'
  buttons.forEach((btn) => {
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-secondary");
  });

  // Add 'btn-primary' class to the clicked button and remove 'btn-secondary'
  button.classList.add("btn-primary");
  button.classList.remove("btn-secondary");

  switch (str) {
    case "all":
      filterList = 0;
      break;
    case "week":
      filterList = 1;
      break;
    case "month":
      filterList = 2;
      break;

    default:
      console.log("error - date filter");
      break;
  }

  refreshList();
};

function cleanLocalHost() {
  let length = localStorage.length;
  for (let i = 0; i < length; i++) {
    const key = localStorage.key(0);
    
    if (key.startsWith("manageu")) {
      localStorage.removeItem(key);
    }
  }
}

window.saveLocal = function saveLocal() {
  cleanLocalHost();
  for (let task of tM.taskArray) {
    

    localStorage.setItem(`manageu${task.id}`, JSON.stringify(task));
  }
};

window.loadLocal = function loadLocal() {
  tM.taskArray = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('manageu')) {
      const rec = JSON.parse(localStorage.getItem(key));
      rec.date = new Date(rec.date);
      tM.taskArray.push(rec);
    }
  }
  refreshList();
};

function refreshList() {
  refreshActive();
  refreshComplete();
}

function refreshActive() {
  let task;
  let ind;

  let olderThen7Days;
  let olderThen30Days;
  document.querySelector("#activeTasks").innerHTML = "";
  for (ind in tM.taskArray) {
    task = tM.taskArray[ind];

    olderThen7Days =
      filterList == 1 && task.date < Date.now() - 7 * 24 * 60 * 60 * 1000;
    olderThen30Days =
      filterList == 2 && task.date < Date.now() - 30 * 24 * 60 * 60 * 1000;

    if (filterList == 0 || olderThen7Days || olderThen30Days) {
      if (!task.complete) {
        
        let str = `<div class="detailedLine"><div class="list-group-item d-inline-block border-dark border-1 text-start w-25 textFont">
           ${task.description}</div>
         
           <div class="list-group-item d-inline-block border-dark border-1  w-25 textFont">${task.date.toLocaleDateString()}</div>
           
         
         <button class="btn btn-success me-1" onclick="completeTask(${
           task.id
         })">
           <i class="fa-solid fa-check"></i>
         </button>
         <button class="btn btn-primary me-1" data-bs-toggle="modal" data-bs-target="#changeModalWindows" onclick="updateTaskDescription(${
           task.id
         })">
           <i class="text-light fa-sharp fa-solid fa-pencil"></i>
         </button>
         <button class="btn btn-danger me-1" onclick="deleteTask(${task.id})">
           <i class="fa-solid fa-trash"></i>
         </button>
         </div>`;

        document.querySelector("#activeTasks").innerHTML += str;
      }
    }
  }
}
function refreshComplete() {
  let task = {};
  let ind;

  let olderThen7Days;
  let olderThen30Days;
  document.querySelector("#completedTasks").innerHTML = "";
  for (ind in tM.taskArray) {
    task = tM.taskArray[ind];

    olderThen7Days =
      filterList == 1 && task.date < Date.now() - 7 * 24 * 60 * 60 * 1000;
    olderThen30Days =
      filterList == 2 && task.date < Date.now() - 30 * 24 * 60 * 60 * 1000;

    if (filterList == 0 || olderThen7Days || olderThen30Days) {
      if (task.complete) {
        let str = `<div class="detailedLine"><div class="list-group-item d-inline-block border-dark border-1 text-start w-25 textFont">
             ${task.description}</div>
           
             <div class="list-group-item d-inline-block border-dark border-1  w-25 textFont">
             ${task.date.toLocaleDateString()}</div>
                     <button class="btn btn-primary me-1" data-bs-toggle="modal"  data-bs-target="#changeModalWindows"   onclick="updateTaskDescription(${
                       task.id
                     })" id="update">
            <i class="text-light fa-sharp fa-solid fa-pencil"></i></button
          ><button class="btn btn-danger me-1" 
          onclick="deleteTask(${task.id})">
            <i class="fa-solid fa-trash"></i>
          </button>
          <button class="btn  me-1">
            <i class="fa-solid "></i>
            </button>
          </div>`;
        document.querySelector("#completedTasks").innerHTML += str;
      }
    }
  }
}

function init() {
  tM = new TaskManager();

  // fix modal bootstrap input field autofocus issue

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        
        setTimeout(() => {
          let targetElement = document.querySelector("#desc-update");
          targetElement.focus();
        }, 500);
      }
    });
  });

  let targetElement = document.querySelector("#lastItem");
  observer.observe(targetElement);
  //-----------------------------

  //-----------------------------
  // test section
  addTestData();

}
init();
