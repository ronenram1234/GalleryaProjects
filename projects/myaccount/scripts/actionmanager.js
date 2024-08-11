"use strict";
import Action from "./action.js";

class ActionManager {
  constructor() {
    this.actionArray = [];
  }

  addAction(actionType, description, amount) {
    const rec = new Action();
    rec.actionType = actionType;
    rec.amount = amount;
    rec.description = description;
    this.actionArray.push(rec);
  }

  findArrayId(id) {
    this.actionArray.findIndex((element) => id == element.id);
  }

  deleteAction(id) {
    const index = this.findArrayId(id);
    this.actionArray.splice(index, 1);
  }

  updateAction(id, desc, amount) {
    const rec = this.actionArray[this.findArrayId(id)];
    rec.desc = desc;
    rec.amount = amount;
  }

  calcBalance() {
    let balance = 0;
    let rec;
    for (rec of this.actionArray) {
      if ((rec.actionType == "income")) balance += Number(rec.amount);
      else balance -= Number(rec.amount);
    }
    return balance;
  }
}

export default ActionManager;
