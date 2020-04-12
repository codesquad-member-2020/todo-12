import { tplColumn, tplAddColumn } from "../tpl/tplColumn.js";
import { _$, __, _c, __$, _a$ } from "../lib/util.js";

export class ColumnView {
  constructor() {
    this.columnArea = _$("#todo");
    this.cardArea = _$(".column__cards");
  }

  setHandler(handler) {
    this.btnShowingAddFormHandler = handler.btnShowingAddFormHandler;
    this.addCardInputFocusHandler = handler.addCardInputFocusHandler;
    this.addCardInputBlurHandler = handler.addCardInputBlurHandler;
    this.addCardActivationBtnHandler = handler.addCardActivationBtnHandler;
    // this.addCancelBtnHandler = handler.addCancelBtnHandler;
  }

  addEventHandler(column) {
    __(column).on("click", (event) => this.btnShowingAddFormHandler(event));
    __(column).on("click", (event) => this.addCardInputFocusHandler(event));
    __(column).on("input", (event) => this.addCardActivationBtnHandler(event));

    const addCardInput = _$(".add__input", column);
    __(addCardInput).on("blur", (event) => this.addCardInputBlurHandler(event));
    // __(addCardInput).on("focus", (event) => this.addCardInputBlurHandler(event));
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
