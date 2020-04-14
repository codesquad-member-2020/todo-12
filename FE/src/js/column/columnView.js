import { tplColumn, tplAddColumn } from "../tpl/tplColumn.js";
import { tplCard } from "../tpl/tplCard.js";
import { Observable } from "./observable.js";
import { _$, __, _c, __$, _a$ } from "../lib/util.js";

export class ColumnView extends Observable {
  constructor() {
    super();
    this.columnArea = _$("#todo");
    this.cardArea = ".column__cards";
    this.column = ".todo__column";
    // this.card = ".column__card";
    // this.dataIdName = "#column-data-id";
    this.cardSelectionFocus = true;
  }

  addEventHandler(column) {
    __(column).on("click", (event) => this.notify(event));
  }

  columnRender(columnId) {
    const columnsHtml = tplColumn(columnId);
    this.columnArea.insertAdjacentHTML("beforeend", columnsHtml);

    const AllColumns = _a$(this.column);

    const currentColumn = [...AllColumns].find(
      (column) => parseInt(column.dataset.columnId) === columnId
    );

    // const currentColumn = _$(`${this.dataIdName}-${columnId}`);

    this.addEventHandler(currentColumn);
    return currentColumn;
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

  cardRender(cardContent, column) {
    const cardArea = _$(this.cardArea, column);
    console.log(cardContent);
    const cardHtml = tplCard(cardContent);
    cardArea.insertAdjacentHTML("afterbegin", cardHtml);
  }

  numberOfCardRender(numberOfCard, column) {
    const countArea = _$(".column__card-count", column);
    return (countArea.innerText = numberOfCard);
  }
}
