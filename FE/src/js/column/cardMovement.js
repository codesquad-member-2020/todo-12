import { _$, __, _c, __$, _a$, fetchData, filterNumber } from "../lib/util.js";

export class CardMovement {
  constructor() {
    this.cardArea = ".column__card";
  }

  addEventHandler() {
    console.log(this.cardArea);
    __$(this.cardArea).on("dragstart", () => console.log("start"));
    __$(this.cardArea).on("dragover", () => console.log("over"));
    __$(this.cardArea).on("dragend", () => console.log("end"));
    __$(this.cardArea).on("dragenter", () => console.log("enter"));
    // __(this.cardArea).on('dragleve')
  }
}
