import { tplColumn, tplAddColumn } from "../tpl/tplColumn.js";
import { tplCard } from "../tpl/tplCard.js";
import { _$, __, _c, __$, _a$ } from "../lib/util.js";

export class Column {
  constructor(addCard) {
    this.columnArea = _$("#todo");
    this.cardArea = ".column__cards";
    this.addCard = addCard;
    this.addCard.subscribe(
      this.cardRender.bind(this),
      this.numberOfCardsRender.bind(this)
    );
  }

  init(initialData) {
    initialData.forEach((columnData) => {
      const { id, name, cards } = columnData;

      this.columnRender(id);
      this.columnNameRender(id, name);
      cards.forEach((card) => this.cardRender(id, card));
      this.numberOfCardsRender(id);
    });

    this.addColumnRender();
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

  cardRender(columnId, card) {
    const DATA_ID = `#column-data-id-`;

    console.log(this.cardArea);

    const column = _$(`${DATA_ID}${columnId}`);
    const cardArea = _$(this.cardArea, column);
    const cardHtml = tplCard(card);

    cardArea.insertAdjacentHTML("afterbegin", cardHtml);
  }

  numberOfCardsRender(columnId) {
    const column = _$(`#column-data-id-${columnId}`);
    const countArea = _$(".column__card-count", column);

    const numberOfCards = _a$(".column__card", column).length;
    countArea.innerText = numberOfCards;
  }
}
