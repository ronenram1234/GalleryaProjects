"use strict";

class Task {
  constructor(description) {
    this.id = Math.floor(Math.random() * 101);
    this.description = this.description;
    this.complete = false;
  }
}

class TaskManager {
  constructor() {
    const taskArray = [];
  }

  addTask(desc) {
    this.taskArray.push(new Task(desc));
  }

  findInd(id) {
    return this.taskArray.filter((t, ind) => {
      t.id == id;
      console.log(pos, this.taskArray[ind]);
      return ind;
    });
  }
  deleteTask(id) {
    let pos = this.findInd(id);

    this.taskArray.splice(index, 1);
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
