import {
  templateColumn,
  templateAddColumn,
} from "../template/templateColumn.js";
import { templateCard } from "../template/templateCard.js";
import { _$, __, _c, _c$, __$, _a$ } from "../lib/util.js";

export class View {
  constructor() {
    this.columnArea = _$("#todo");
    this.cardArea = ".column__cards";
    this.card = ".column__card";
    this.column = ".todo__column";
    this.inputFocus = "input-active";
    this.cardContent = ".card__content";
    // this.cardSelectionFocus = "true"; // 인자로 넘기기
    // this.previousFocus = null;
  }

  columnRender(columnId) {
    const columnsHtml = templateColumn(columnId);
    this.columnArea.insertAdjacentHTML("beforeend", columnsHtml);

    const AllColumns = _a$(this.column);

    const currentColumn = [...AllColumns].find(
      (column) => column.dataset.columnId === columnId
    );

    return currentColumn;
  }

  addColumnRender() {
    if (!templateAddColumn) return;
    const addColumn = templateAddColumn();

    this.columnArea.insertAdjacentHTML("beforeend", addColumn);
  }

  columnNameRender(name, column) {
    const title = _a$(".column__title", column);

    title.forEach((nameArea) => (nameArea.innerText = name));
  }

  cardRender(cardContent, column) {
    const cardArea = _$(this.cardArea, column);
    const cardHtml = templateCard(cardContent);
    cardArea.insertAdjacentHTML("afterbegin", cardHtml);
  }

  updateCard(cardContent, card) {
    const cardContentAret = _$(this.cardContent, card);
    cardContentAret.textContent = cardContent;
  }

  deleteCard(card) {
    return card.remove();
  }

  numberOfCardRender(numberOfCard, column) {
    const countArea = _$(".column__card-count", column);
    return (countArea.innerText = numberOfCard);
  }

  onFocus({ target }) {
    if (this.focusCard) this.onFocusOut(this.focusCard);
    const currentCard = target.closest(this.card);
    if (!currentCard) return;

    _c(currentCard).add("input-active");
    this.focusCard = currentCard;
  }

  onFocusOut(card) {
    _c(card).remove("input-active");
  }
}
