import { __, fetchData } from "../lib/util.js";

export class Controller {
  constructor({ model, view, components, controllerInfo }) {
    this.initialUrl = controllerInfo.initialUrl;
    this.model = model;
    this.view = view;
    this.components = [...components];
    this.option = controllerInfo.option;
  }

  fetchInitialData() {
    fetchData(this.initialUrl, "GET").then((initialData) => this.init(initialData));
  }

  init(initialData) {
    initialData.forEach((data) => {
      const { id, name, cards } = data;
      let strId = id.toString();

      this.model.setColumnList(strId);
      this.model.setColumnName(strId, name);
      cards.forEach((card) => this.model.setCardList(strId, card));
      this.model.cardLength[strId] = cards.length;
      this.model.increaseCardLength(strId, false);
    });

    this.view.addColumnRender();
    this.components.forEach((component) => component.init());
    this.addEventHandler();
  }

  addEventHandler() {
    __(document).on("click", (event) => this.onClick(event));

    if (this.option.dblclickEvent) __(document).on("dblclick", (event) => this.onDblclick(event));

    if (this.option.inputEvent) __(document).on("input", (event) => this.onInput(event));
  }

  onClick(event) {
    this.components.forEach((component) => component.addClickHandler(event));

    if (this.option.cardFocus) this.view.onFocus(event);
  }

  onDblclick(event) {
    this.components.forEach((component) => component.addDblclickHandler(event));
  }

  onInput(event) {
    this.components.forEach((component) => component.addInputHandler(event));
  }
}
