"use strict";

import TaskManager from "./TaskManager.js";

// Test functions
let tM = new TaskManager();
console.log();

tM.addTask("buy millk");
tM.addTask("buy food for weekend");
tM.addTask("return laundry");
tM.addTask("clean yard");
console.log(tM.taskArray, tM.taskArray[0].id);
tM.deleteTask(tM.taskArray[0].id);
console.log(tM.taskArray);

tM.updateTaskDescription(tM.taskArray[1].id, "test 12 3");
tM.completeTask(tM.taskArray[1].id);
