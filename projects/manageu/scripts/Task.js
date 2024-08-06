"use strict";

class Task {
  constructor(description) {
    this.id = Math.floor(Math.random() * 101);
    this.description = description;
    this.complete = false;
  }
}

export default Task;
