"use strict";

import TaskManager from "./TaskManager.js";

var tM;

function test() {
  document.querySelector("#description").value = "buy food for weekend";
  tM.addTask();

  document.querySelector("#description").value = "return laundry";
  tM.addTask();
  tM.taskArray[1].complete = true;

  document.querySelector("#description").value = "clean yard";
  tM.addTask();
  refreshList();
}

window.addNewTask = function addNewTask() {
  tM.addTask(document.querySelector("#description").value);
  refreshList();
  console.log(tM);
};

window.completeTask = function completeTask(id) {
  tM.completeTask(id);
  refreshList();
};
window.updateTaskDescription = function updateTaskDescription(id) {
  // modal.open()
  document.querySelector("#changeModalWindows").style.visibility = "visible";
  // tM.updateTaskDescription(id);
  // refreshList();
};
window.deleteTask = function deleteTask(id) {
  tM.deleteTask(id);
  refreshList();
};

function refreshList() {
  refreshActive();
  refreshComplete();
}

function refreshActive() {
  let task;
  let ind;
  document.querySelector("#activeTasks").innerHTML = "";
  for (ind in tM.taskArray) {
    task = tM.taskArray[ind];
    if (!task.complete) {
      console.log(task);
      let str = `<div>
          <li class="list-group-item d-inline-block w-50">
            ${task.description}
          </li>
          <button
            class="btn btn-success me-1"
             onclick="completeTask(${task.id})">
            <i class="fa-solid fa-check"></i></button
          ><button class="btn btn-primary me-1" data-bs-toggle="modal"  data-bs-target="#changeModalWindows"   onclick="updateTaskDescription(${task.id})">
            <i class="text-light fa-sharp fa-solid fa-pencil"></i></button
          ><button class="btn btn-danger me-1"
          onclick="deleteTask(${task.id})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>`;

      document.querySelector("#activeTasks").innerHTML += str;
    }
  }
}
function refreshComplete() {
  let task = {};
  let ind;
  document.querySelector("#completedTasks").innerHTML = "";
  for (ind in tM.taskArray) {
    task = tM.taskArray[ind];
    if (task.complete) {
      console.log(task);
      let str = `<div>
          <li class="list-group-item d-inline-block w-50">
            ${task.description}
          </li>
          <button class="btn btn-primary me-1" data-bs-toggle="modal"  data-bs-target="#changeModalWindows"   onclick="updateTaskDescription(${task.id})">
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

function init() {
  tM = new TaskManager();

  test();
}
init();
