import { tplColumn, tplAddColumn } from "../tpl/tplColumn.js";
import { _$, __, _c, __$, _a$ } from "../lib/util.js";

export class Column {
  constructor(addCard) {
    this.columnArea = _$("#todo");
    this.addCard = addCard;
  }

  addEventHandler(column) {
    __(column).on("click", (event) => this.addCard.addEventHandler(event));
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

  columnNameRender(columnId, name) {
    const column = _$(`#column-data-id-${columnId}`);
    const title = _a$(".column__title", column);

    title.forEach((nameArea) => (nameArea.innerText = name));
  }

  numberOfCardsRender(columnId) {
    const column = _$(`#column-data-id-${columnId}`);
    const countArea = _$(".column__card-count", column);

    const numberOfCards = _a$(".column__card", column).length;
    countArea.innerText = numberOfCards;
  }
}
