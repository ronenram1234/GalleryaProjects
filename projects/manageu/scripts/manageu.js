"use strict";

import TaskManager from "./TaskManager.js";

var tM;

function test() {
  document.querySelector("#description").value = "buy food for weekend";
  addNewTask();

  document.querySelector("#description").value = "return laundry";
  addNewTask();
  tM.taskArray[1].complete = true;

  document.querySelector("#description").value = "clean yard";
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
  // const index=tM.findInd(id)
  const rec = tM.taskArray[tM.findInd(id)];
  document.querySelector("#desc-update").value = rec.description;
  document.querySelector("#recID").innerHTML = rec.id;

  // tM.updateTaskDescription(id);
  // refreshList();
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
    const ret = localStorage.setItem(`manageu${task.id}`, JSON.stringify(task));
    console.log(ret);
    if (!task.complete) {
      // console.log(task);
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
      // console.log(task);
      let str = `<div>
          <li class="list-group-item d-inline-block w-50">
            ${task.description}
          </li>
          <button class="btn btn-primary me-1" data-bs-toggle="modal"  data-bs-target="#changeModalWindows"   onclick="updateTaskDescription(${task.id})" id="update">
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

  // fix modal bootstrap input field autofocus issue

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("Element is visible!");
        setTimeout(() => {
          let targetElement = document.querySelector("#desc-update");
          targetElement.focus();
        }, 300);
      }
    });
  });

  let targetElement = document.querySelector("#lastItem");
  observer.observe(targetElement);
  //-----------------------------

  //-----------------------------
  // test section
  test();

  //  const b=document.querySelector("#update")
  // console.log(b);
  // b.click()
  // test section - end
}
init();
