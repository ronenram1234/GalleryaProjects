"use strict";
import Task from "./Task.js";


class TaskManager {
  constructor() {
    this.taskArray = [];
  }

  addTask (desc)  {
    // let desc = document.querySelector("#description").value;
    // let t = new Task(desc);
    this.taskArray.push(new Task(desc));
    // console.log(this.taskArray);
  
  };

  findInd (id) {
    return this.taskArray.findIndex((item) => item.id == id);
  };
  deleteTask (id) {
    let pos = this.findInd(id);

    this.taskArray.splice(pos, 1);
  };

  updateTaskDescription  (id, desc) {

    
    let pos = this.findInd(id);

    this.taskArray[pos].description = desc;
  };

  
  completeTask(id) {
  
    let pos = this.findInd(id);
    this.taskArray[pos].complete = true;
    
  }

 
}


export default TaskManager;
