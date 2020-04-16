import { _$, __, _c, _a$, fetchData } from "../lib/util.js";
import { Component } from "./component.js";
import { templateHistory } from "../template/templateHistory.js";

export class History extends Component {
  constructor({ model }) {
    super();
    this.model = model;
    this.wrap = "#wrap";
  }
  init() {
    this.render();
  }

  render() {
    const historyHtml = templateHistory();
    const historyArea = _$(this.wrap);
    historyArea.insertAdjacentHTML("beforeend", historyHtml);
  }
}
