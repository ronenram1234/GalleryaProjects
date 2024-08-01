"use strict";

class Task {
  constructor(description) {
    this.id = Math.floor(Math.random() * 101);
    this.description = description;
    this.complete = false;
  }
}

let taskArray = [];
class TaskManager {
  // constructor() {
  // }

  addTask(desc) {
    taskArray.push(new Task(desc));
  }

  findInd(id) {
    return taskArray.findIndex((item) => item.id == id);
    // return taskArray.filter((t, ind) => {
    //   t.id == id;
    //   console.log(ind, taskArray[ind]);
    //   return ind;
    // });
  }
  deleteTask(id) {
    let pos = this.findInd(id);

    taskArray.splice(pos, 1);
  }

  updateTaskDescription(id, desc) {
    let pos = this.findInd(id);

    taskArray[pos].description = desc;
  }

  completeTask(id) {
    let pos = this.findInd(id);
    taskArray[pos].complete = true;
  }
}


// Test functions
let tM = new TaskManager();

tM.addTask("buy millk");
tM.addTask("buy food for weekend");
tM.addTask("return laundry");
tM.addTask("clean yard");
console.log(taskArray, taskArray[0].id);
tM.deleteTask(taskArray[0].id);
console.log(taskArray);

tM.updateTaskDescription(taskArray[1].id,"test 12 3")
tM.completeTask(taskArray[1].id)
