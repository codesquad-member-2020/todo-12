import { tplColumn, tplAddColumn } from "../tpl/columnTpl.js";
import { tplCard } from "../tpl/cardTpl.js";
import { _$, __, _c, __$ } from "../utils/util.js";

export class ColumnView {
  constructor() {}

  columnRender(columnList) {
    const columnArea = _$("#todo");
    let columnsHtml = columnList.reduce(
      (column) => (column += tplColumn()),
      ""
    );
    if (tplAddColumn) columnsHtml += tplAddColumn();

    columnArea.innerHTML = columnsHtml;
  }

  columnNameRender(name, column) {
    //column을 돌며 column name을 추가해준다.
    const title = _$(".column__title", true, column);

    title.forEach((nameArea) => (nameArea.innerText = name));
    column.id = `todo__${name}`;
  }

  cardListRender(cards, column) {
    const cardArea = _$(".column__cards", false, column);

    cards.forEach((card) => {
      const cardHtml = tplCard(card);
      cardArea.insertAdjacentHTML("afterend", cardHtml);
    });
  }

  numberOfCardsRender(card, column) {
    const countArea = _$(".column__card-count", false, column);
    // countArea.innerText =
    //section에 아이디 추가
    //column__card-count 모두가져와서 네임추가
  }
}
