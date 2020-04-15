import { _$, __, _c, __$, _a$, fetchGetData } from "../lib/util.js";
import { Observable } from "./observable.js";

export class Model extends Observable {
  constructor(view) {
    super();
    this.view = view;
    this.initialUrl = "http://15.165.163.174:8080";
    this.columnList = new Map();
    this.cardList = new Map();
    this.cardLength = {};
    this.cardArea = ".column__card";
    this.card = ".column__card";
  }

  fetchinitialData() {
    fetchGetData(this.initialUrl).then((initialData) => this.init(initialData));
  }

  init(initialData) {
    initialData.forEach((columnData) => {
      const { id, name, cards } = columnData;
      let strId = id.toString();

      this.setColumnList(strId);
      this.setColumnName(strId, name);
      this.cardLength[strId] = cards.length;
      cards.forEach((card) => this.setCardList(strId, card));
      this.increaseCardLength(strId, false);
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

  getColumnListById(id) {
    return this.columnList.get(id);
  }

  getColumnListByElement(element) {
    return this.columnList.get(element);
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

  getColumnName(column) {
    return this.columnList.get(column).name;
  }

  setCardList(columnId, cardContent, movement) {
    const column = this.columnList.get(columnId).column;

    const cardId = cardContent.id.toString();

    if (!movement) this.view.cardRender(cardContent, column);

    const AllCards = _a$(this.card);
    const card = [...AllCards].find((card) => card.dataset.cardId === cardId);

    this.cardList.set(card, {
      id: cardId,
      card: cardContent,
      columnId: columnId,
      column: column,
    });

    this.cardList.set(cardId, {
      card: card,
      cardContent: cardContent,
      columnId: columnId,
      column: column,
    });

    console.log(this.cardList);
  }

  getCardListById(id) {
    return this.cardList.get(id);
  }

  getCardListByElement(element) {
    return this.cardList.get(element);
  }

  increaseCardLength(columnId, increase = true) {
    const column = this.columnList.get(columnId).column;

    if (increase) this.cardLength[columnId]++;

    this.view.numberOfCardRender(this.cardLength[columnId], column);

    // this.columnList.get(columnId).cardLength = cardLength;
    // this.columnList.get(column).cardLength = cardLength;
    // const column = this.columnList.get(columnId);

    // const numberOfCard = _a$(this.cardArea, column).length;
  }

  decreaseCardLength(columnId, decrease = true) {
    const column = this.columnList.get(columnId).column;

    if (decrease) this.cardLength[columnId]--;

    this.view.numberOfCardRender(this.cardLength[columnId], column);
  }

  getCardLength(columnId) {
    return this.cardLength[columnId];
  }

  // setTimeModified(create, modified) {
  //   this._timeModified = timeForToday(create, modified);

  //   return this.notyfi();
  // }

  // getTimeModified() {
  //   return this._timeModified;
  // }
}
