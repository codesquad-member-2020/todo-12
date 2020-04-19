import { __, _c } from "../lib/util.js";

export class Component {
  constructor() { }
  init() { }
  addClickHandler(event) { }
  addDblclickHandler(event) { }
  addInputHandler(event) { }

  activateBtn(target, input) {
    if (!input.value) return (target.disabled = "disabled");
    target.disabled = false;
  }

  addBorderFocusEvents(input, selector) {
    __(input).on("blur", () => _c(input).remove(selector));
    _c(input).add(selector);
  }
}
