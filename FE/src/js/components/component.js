export class Component {
  constructor() {}
  init() {}
  addClickHandler(event) {}
  addDblclickHandler(event) {}
  addInputHandler(evet) {}

  activateBtn(target, input) {
    // const target = _$("." + this.target, currentColumn);

    if (!input.value) return (target.disabled = "disabled");
    target.disabled = false;
  }
}
