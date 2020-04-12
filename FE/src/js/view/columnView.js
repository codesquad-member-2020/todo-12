import { tplColumn, tplAddColumn } from "../tpl/tplColumn.js";
import { tplCard } from "../tpl/tplCard.js";
import { _$, __, _c, __$, _a$ } from "../lib/util.js";

export class ColumnView {
  constructor() {
    this.columnArea = _$("#todo");
    this.cardArea = _$(".column__cards");
  }

  // 수정하기
  columnRender(id) {
    const columnsHtml = tplAddColumn(id);

    this.columnArea.insertAdjacentHTML("beforeend", columnsHtml);
  }

  addColumnRender() {
    if (!tplAddColumn) return;
    const addColumn = tplAddColumn();

    this.columnArea.insertAdjacentHTML("beforeend", addColumn);
  }

  columnNameRender(name, column) {
    //column을 돌며 column name을 추가해준다.
    const title = _a$(".column__title", column);

    title.forEach((nameArea) => (nameArea.innerText = name));
  }

  cardRender(columnId, card) {
    const column = _$(`column-data-id${columnId}`);
    const cardArea = _$(this.cardArea, column);
    const cardHtml = tplCard(card);

    cardArea.insertAdjacentHTML("afterbegin", cardHtml);
  }

  numberOfCardsRender(numberOfCards, column) {
    const countArea = _$(".column__card-count", column);

    countArea.innerText = numberOfCards;
  }
}
