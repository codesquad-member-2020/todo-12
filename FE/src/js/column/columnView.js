import { tplColumn, tplAddColumn } from "../tpl/tplColumn.js";
import { _$, __, _c, __$, _a$ } from "../lib/util.js";

export class ColumnView {
  constructor() {
    this.columnArea = _$("#todo");
    this.cardArea = _$(".column__cards");
  }

  setHandler(handler) {
    this.addCardBtnHandler = handler.addCardBtnHandler;
    this.addCardInputHandler = handler.addCardInputHandler;
    this.addInputBlurHandler = handler.addInputBlurHandler;
    // this.addCancelBtnHandler = handler.addCancelBtnHandler;
  }

  addEventHandler(column) {
    __(column).on("click", (event) => this.addCardBtnHandler(event));
    __(column).on("click", (event) => this.addCardInputHandler(event));

    const addCardInput = _$(".add__input", column);
    __(addCardInput).on("blur", (event) => this.addInputBlurHandler(event));
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

  numberOfCardsRender(columnId, numberOfCards) {
    const column = _$(`#column-data-id-${columnId}`);
    const countArea = _$(".column__card-count", column);

    countArea.innerText = numberOfCards;
  }
}
