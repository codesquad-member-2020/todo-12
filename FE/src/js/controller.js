import { Observable } from "./observable.js";
import { _$, __, fetchGetData } from "./lib/util.js";

import { mock } from "./mock.js";

export class Controller extends Observable {
  constructor({ model, view }) {
    super();
    this.initialUrl = "http://15.165.163.174:8080";
    this.model = model;
    this.view = view;
  }

  fetchInitialData() {
    fetchGetData(this.initialUrl).then((initialData) => this.init(initialData));
    // this.init(mock.categories);
  }

  init(initialData) {
    initialData.forEach((data) => {
      const { id, name, cards } = data;
      let strId = id.toString();

      this.model.setColumnList(strId);
      this.addEventHandler(strId);
      this.model.setColumnName(strId, name);
      cards.forEach((card) => this.model.setCardList(strId, card));
      this.model.cardLength[strId] = cards.length;
      this.model.increaseCardLength(strId, false);
    });

    this.view.addColumnRender();
    this.renderFinishedNotify(); //f랜더링 끝남을 알린다
    debugger;
  }

  addEventHandler(id) {
    const column = this.model.getColumn(id);
    __(column).on("click", (event) => this.eventNotify(event)); //이벤트를 설치

    // this.fucusCard(event);
  }
}
