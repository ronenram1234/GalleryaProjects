"use strict";

class Action {
    constructor(actionType,amount, description) {
      this.id = Math.floor(Math.random() * 101);
      this.actionType = actionType; 
      this.amount = amount;
      this.description = description;
      
    }
  }
  
  export default Action;
  