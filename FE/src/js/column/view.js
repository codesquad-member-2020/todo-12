import {
  templateColumn,
  templateAddColumn,
} from "../template/templateColumn.js";
import { templateCard } from "../template/templateCard.js";
import { _$, __, _c, _c$, __$, _a$ } from "../lib/util.js";

export class View {
  constructor(viewInfo) {
    this.selector = viewInfo.selector;
    this.columnArea = _$(this.selector.columnArea);

  }

  columnRender(columnId) {
    const columnsHtml = templateColumn(columnId);
    this.columnArea.insertAdjacentHTML("beforeend", columnsHtml);

    const AllColumns = _a$(this.selector.column);

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
    const title = _a$(this.selector.columnTitle, column);

    title.forEach((nameArea) => (nameArea.innerText = name));
  }

  cardRender(cardContent, column) {
    const cardArea = _$(this.selector.cardArea, column);
    const cardHtml = templateCard(cardContent);
    cardArea.insertAdjacentHTML("afterbegin", cardHtml);
  }

  updateCard(cardContent, card) {
    const cardContentAret = _$(this.selector.cardContent, card);
    cardContentAret.textContent = cardContent;
  }

  deleteCard(card) {
    return card.remove();
  }

  numberOfCardRender(numberOfCard, column) {
    const countArea = _$(this.selector.columnCount, column);
    return (countArea.innerText = numberOfCard);
  }

  onFocus({ target }) {
    if (this.focusCard) this.onFocusOut(this.focusCard);

    const currentCard = target.closest(this.selector.card);
    if (!currentCard) return;

    _c(currentCard).add(this.selector.borderFocus);
    this.focusCard = currentCard;
  }

  onFocusOut(card) {
    _c(card).remove(this.selector.borderFocus);
  }
}
