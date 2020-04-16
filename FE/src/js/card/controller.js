import { Observable } from "./observable.js";
import { _$, __, fetchGetData } from "../lib/util.js";

export class Controller extends Observable {
  constructor({ model, view, components }) {
    super();
    this.initialUrl = "http://15.165.163.174:8080";
    this.model = model;
    this.view = view;
    this.components = [...components];
    this.cardFocus = true;
    this.card = ".column__card";
  }

  fetchInitialData() {
    fetchGetData(this.initialUrl).then((initialData) => this.init(initialData));
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
    __(document).on("click", (event) => {
      this.components.forEach((component) => component.addClickHandler(event));
      if (this.cardFocus) this.view.onFocus(event);
    });
    __(document).on("dblclick", (event) =>
      this.components.forEach((component) =>
        component.addDblclickHandler(event)
      )
    );
    __(document).on("input", () =>
      this.components.forEach((component) => component.addInputHandler(event))
    );
  }
}
