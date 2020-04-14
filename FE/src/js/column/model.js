import { _$, __, _c, __$, _a$, fetchGetData } from "../lib/util.js";
import { Observable } from "./observable.js";

export class Model extends Observable {
  constructor(view) {
    super();
    this.view = view;
    this.initialUrl = "http://15.165.163.174:8080";
    this.columnList = new Map();
    this.cardList = new Map();
    this.cardArea = ".column__card";
    this.card = ".column__card";
  }

  fetchinitialData() {
    fetchGetData(this.initialUrl).then((initialData) => this.init(initialData));
  }

  init(initialData) {
    initialData.forEach((columnData) => {
      const { id, name, cards } = columnData;

      this.setColumnList(id);
      this.setColumnName(id, name);
      cards.forEach((card) => this.setCardList(id, card));
      this.setCardLength(id);
    });

    this.view.addColumnRender();
    this.notify();
  }

  setColumnList(id) {
    const column = this.view.columnRender(id);

    this.columnList.set(column, {
      id: id,
      name: null,
      cardLength: null,
    });

    this.columnList.set(id, {
      column: column,
      name: null,
      cardLength: null,
    });
  }

  getColumn(obj) {
    if (obj.id) return this.columnList.get(id).column;
    if (obj.column) return this.columnList.get(column).column;
  }

  setColumnName(id, name) {
    if (this.columnList.get(id).name === name) return;

    const column = this.columnList.get(id).column;
    this.view.columnNameRender(name, column);

    this.columnList.get(id).name = name;
    this.columnList.get(column).name = name;

    // this.columnNameList.set(id, name);
    // this.view.columnNameRender(name, this.columnList.get(id));
  }

  getColumnName(obj) {
    if (obj.id) return this.columnList.get(id).name;
    if (obj.column) return this.columnList.get(column).name;
  }

  setCardList(columnId, cardContent) {
    const column = this.columnList.get(columnId).column;

    const cardId = cardContent.id;

    this.view.cardRender(cardContent, column);

    const AllCards = _a$(this.card);
    const card = [...AllCards].find(
      (card) => parseInt(card.dataset.cardId) === cardContent.id
    );

    this.cardList.set(card, {
      id: cardId,
      cardContent: cardContent,
      columnId: columnId,
      column: column,
    });

    this.cardList.set(cardId, {
      card: card,
      cardContent: cardContent,
      columnId: columnId,
      column: column,
    });

    // const cardId = card.id;

    // this.cardList.set(cardId, { card: card, columnId: columnId });

    // return this.view.cardRender(card, column);
  }

  getCard(obj) {
    if (obj.id) return this.cardList.get(id).card;
    if (obj.column) return this.cardList.get(column).card;
  }

  setCardLength(columnId) {
    const column = this.columnList.get(columnId).column;
    const cardLength = _a$(this.cardArea, column).length;

    this.view.numberOfCardRender(cardLength, column);

    this.columnList.get(columnId).cardLength = cardLength;
    this.columnList.get(column).cardLength = cardLength;
    // const column = this.columnList.get(columnId);

    // const numberOfCard = _a$(this.cardArea, column).length;
  }

  getCardLength(obj) {
    if (obj.id) return this.columnList.get(id).cardLength;
    if (obj.column) return this.columnList.get(column).cardLength;
  }

  // setTimeModified(create, modified) {
  //   this._timeModified = timeForToday(create, modified);

  //   return this.notyfi();
  // }

  // getTimeModified() {
  //   return this._timeModified;
  // }
}
