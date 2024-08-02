"use strict";

class Task {
  constructor(description) {
    this.id = Math.floor(Math.random() * 101);
    this.description = description;
    this.complete = false;
  }
}

// let taskArray = [];

class TaskManager {
  constructor() {
    this.taskArray = []
  }

  addTask(desc) {
    this.taskArray.push(new Task(desc));
  }

  findInd(id) {
    return this.taskArray.findIndex((item) => item.id == id);

  }
  deleteTask(id) {
    let pos = this.findInd(id);

    this.taskArray.splice(pos, 1);
  }

  updateTaskDescription(id, desc) {
    let pos = this.findInd(id);

    this.taskArray[pos].description = desc;
  }

  completeTask(id) {
    let pos = this.findInd(id);
    this.taskArray[pos].complete = true;
  }
}


// Test functions
let tM = new TaskManager();

tM.addTask("buy millk");
tM.addTask("buy food for weekend");
tM.addTask("return laundry");
tM.addTask("clean yard");
console.log(tM.taskArray, tM.taskArray[0].id);
tM.deleteTask(tM.taskArray[0].id);
console.log(tM.taskArray);

tM.updateTaskDescription(tM.taskArray[1].id,"test 12 3")
tM.completeTask(tM.taskArray[1].id)
