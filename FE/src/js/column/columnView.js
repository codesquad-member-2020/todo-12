import { tplColumn, tplAddColumn } from "../tpl/tplColumn.js";
import { _$, __, _c, __$, _a$ } from "../lib/util.js";

export class ColumnView {
  constructor() {
    this.columnArea = _$("#todo");
    this.cardArea = _$(".column__cards");
  }

  columnRender(id) {
    const columnsHtml = tplColumn(id);

    this.columnArea.insertAdjacentHTML("beforeend", columnsHtml);
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
