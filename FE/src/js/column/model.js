import { _$, __, _c, __$, _a$ } from "../lib/util.js";
import { Observable } from "./observable.js";

export class Model extends Observable {
  constructor(view) {
    super();
    this.view = view;
    this.columnList = new Map();
    this.columnNameList = new Map();
    this.cardList = new Map();
    this.numberOfCardList = new Map();
    this.cardArea = ".column__card";
    this.dataIdName = "#column-data-id";
  }

  init(initialData) {
    initialData.forEach((columnData) => {
      const { id, name, cards } = columnData;

      this.setColumnList(id);
      this.setColumnNameList(id, name);
      cards.forEach((card) => this.setCardList(id, card));
      this.setNumberOfCard(id);
    });

    this.view.addColumnRender();
    this.notify();
  }

  setColumnList(id) {
    const column = this.view.columnRender(id);

    this.columnList.set(id, column);
  }

  getColumnList() {
    return this.columnList;
  }

  setColumnNameList(id, name) {
    if (this.columnNameList.get(id) === name) return;

    this.columnNameList.set(id, name);
    this.view.columnNameRender(name, this.columnList.get(id));
  }

  getColumnNameList() {
    return this.columnNameList;
  }

  setCardList(columnId, card) {
    const column = this.columnList.get(columnId);
    const cardId = card.id;

    this.cardList.set(cardId, { card: card, columnId: columnId });

    return this.view.cardRender(card, column);
  }

  getCardList() {
    return this.cardList;
  }

  setNumberOfCard(columnId) {
    const column = this.columnList.get(columnId);

    const numberOfCard = _a$(this.cardArea, column).length;
    return this.view.numberOfCardRender(numberOfCard, column);
  }

  getNumberOfCards() {
    return this.numberOfCardList;
  }

  // setTimeModified(create, modified) {
  //   this._timeModified = timeForToday(create, modified);

  //   return this.notyfi();
  // }

  // getTimeModified() {
  //   return this._timeModified;
  // }
}
