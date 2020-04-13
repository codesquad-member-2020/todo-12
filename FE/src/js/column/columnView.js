import { tplColumn, tplAddColumn } from "../tpl/tplColumn.js";
import { tplCard } from "../tpl/tplCard.js";
import { Observable } from "./observable.js";
import { _$, __, _c, __$, _a$ } from "../lib/util.js";

export class ColumnView extends Observable {
  constructor() {
    super();
    this.columnArea = _$("#todo");
    this.cardArea = ".column__cards";
  }

  addEventHandler(column) {
    __(column).on("click", (event) => this.notify(event));
    //각 기능들이 구독해서 이벤트를 설치한다
  }

  columnRender(columnId) {
    const columnsHtml = tplColumn(columnId);
    this.columnArea.insertAdjacentHTML("beforeend", columnsHtml);

    const currentColumn = _$(`#column-data-id-${columnId}`);
    this.addEventHandler(currentColumn);
  }

  addColumnRender() {
    if (!tplAddColumn) return;
    const addColumn = tplAddColumn();

    this.columnArea.insertAdjacentHTML("beforeend", addColumn);
  }

  columnNameRender(name, column) {
    const title = _a$(".column__title", column);

    title.forEach((nameArea) => (nameArea.innerText = name));
  }

  cardRender(card, column) {
    const cardArea = _$(this.cardArea, column);
    const cardHtml = tplCard(card);

    cardArea.insertAdjacentHTML("afterbegin", cardHtml);
  }

  numberOfCardRender(numberOfCard, column) {
    const countArea = _$(".column__card-count", column);
    return (countArea.innerText = numberOfCard);
  }
}
