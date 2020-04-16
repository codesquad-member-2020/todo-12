import { _$, __, _c, __$, _a$, fetchGetData } from "../lib/util.js";

export class Model {
  constructor({ view }) {
    this.view = view;
    this.columnList = new Map();
    this.cardList = new Map();
    this.cardLength = {};
    this.card = ".column__card";
  }

  setColumnList(id) {
    const column = this.view.columnRender(id);

    this.columnList.set(column, {
      id: id,
      name: null,
    });

    this.columnList.set(id, {
      column: column,
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

    const AllCards = _a$(this.card);
    const card = [...AllCards].find((card) => card.dataset.cardId === cardId);

    if (option === "update") this.view.updateCard(cardContent.content, card);

    this.cardList.set(card, {
      id: cardId,
      cardData: cardContent,
      columnId: columnId,
      column: column,
    });

    this.cardList.set(cardId, {
      card: card,
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
