import { _$, __, _c, _a$ } from "../lib/util.js";

export class Model {
  constructor({ view, modelInfo }) {
    this.view = view;
    this.columnList = new Map();
    this.cardList = new Map();
    this.cardLength = {};
    this.selector = modelInfo.selector;
  }

  setColumnList(id) {
    const columnElement = this.view.columnRender(id);

    this.columnList.set(columnElement, {
      id: id,
      name: null,
    });

    this.columnList.set(id, {
      column: columnElement,
      name: null,
    });
  }

  getColumn(id) {
    return this.columnList.get(id).column;
  }

  getColumnId(element) {
    return this.columnList.get(element).id;
  }

  setColumnName(id, name) {
    if (this.columnList.get(id).name === name) return;

    const column = this.columnList.get(id).column;
    this.view.columnNameRender(name, column);

    this.columnList.get(id).name = name;
    this.columnList.get(column).name = name;
  }

  getColumnName(column) {
    return this.columnList.get(column).name;
  }

  setCardList(columnId, cardContent, option) {
    const column = this.columnList.get(columnId).column;

    const cardId = cardContent.id.toString();

    if (!option) this.view.cardRender(cardContent, column);

    const AllCards = _a$(this.selector.card);
    const cardElement = [...AllCards].find((card) => card.dataset.cardId === cardId);

    if (option === "update") this.view.updateCard(cardContent.content, cardElement);

    this.cardList.set(cardElement, {
      id: cardId,
      cardData: cardContent,
      columnId: columnId,
      column: column,
    });

    this.cardList.set(cardId, {
      card: cardElement,
      cardData: cardContent,
      columnId: columnId,
      column: column,
    });
  }

  deleteCard(id) {
    const card = this.cardList.get(id).card;
    this.view.deleteCard(card);

    const columnId = this.cardList.get(id).columnId;
    this.decreaseCardLength(columnId);

    this.cardList.delete(id);
    this.cardList.delete(card);
  }

  getCardListById(id) {
    return this.cardList.get(id);
  }

  getCardList(element) {
    return this.cardList.get(element);
  }

  increaseCardLength(columnId, increase = true) {
    const column = this.columnList.get(columnId).column;

    if (increase) this.cardLength[columnId]++;

    this.view.numberOfCardRender(this.cardLength[columnId], column);
  }

  decreaseCardLength(columnId, decrease = true) {
    const column = this.columnList.get(columnId).column;

    if (decrease) this.cardLength[columnId]--;

    this.view.numberOfCardRender(this.cardLength[columnId], column);
  }

  getCardLength(columnId) {
    return this.cardLength[columnId];
  }

  setHistory(history) {
    this.historyList = history;
  }

  getHistory() {
    return this.historyList;
  }
}
