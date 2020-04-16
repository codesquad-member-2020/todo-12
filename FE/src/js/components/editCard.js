import { _$, __$, __, _c, _a$, fetchData } from "../lib/util.js";
import { Component } from "./component.js";

export class EditCard extends Component {
  constructor({ model }) {
    super();
    // this.controller = controller;
    // this.controller.dblclickNotify(this.addEventHandler.bind(this));
    this.model = model;
    this.closetBtn = "card-delete-btn";
    this.card = ".column__card";
  }

  addDblclickHandler(event) {
    console.log(event, 1);
    // __$(this.card).on("dblclick", () => console.log(1));
  }
}
