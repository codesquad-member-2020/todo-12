import { Model } from "./model.js";
import { _$, __, _c, __$ } from "../lib/util.js";
import { timeForToday } from "../lib/timeForToday.js";

export class ColumnModel extends Model {
  constructor(...views) {
    super(...views);
    this._columnNameList = new Map();
    this._cardList = new Map();
    this._numberOfCards = new Map();
  }

  handleInitialData(initialData) {
    initialData.forEach((columnData, index) => {
      const { id, name, cards } = columnData;
      const currentColumn = this._columnList[index];

      this.setColumnList(id);
      this.setColumnNameList(id, name, currentColumn);
      this.initCard(id, cards);
    });

    this._views.addColumnRender();
  }

  initCard(columnId, cards) {
    cards.forEach((card) =>
      this.notify((view) => view.cardRender(columnId, card))
    );
    this.setNumberOfCards(columnId);
  }

  setColumnList(id) {
    this.notify((view) => view.columnRender(id));

    return (this._columnList = [..._$(".todo__column", true)]);
  }

  getColumnList() {
    return this._columnList;
  }

  setColumnNameList(id, name, column) {
    //변화가 있을때 => 칼럼 제목, 카드카운트, 카드
    if (this._columnNameList.has(name)) return;

    this._columnNameList.set(column, { id, name });
    return this.notify((view) => view.columnNameRender(name, column));
  }

  getColumnNameList() {
    return this._columnNameList;
  }

  setCardList(card, column) {
    this._cardList.set(column, card);
    this.setNumberOfCards(card, column);

    return this.notify((view) => view.cardListRender(card, column));
  }

  getCardList() {
    return this._cardList;
  }

  deleteCard(card, column) {
    this._cardList.delete(column, card);
    this.setNumberOfCards(card, column);

    return this.notify((view) => view.cardListRender(card, column));
  }

  setNumberOfCards(columnId) {
    const column = _$(`column-data-id${columnId}`);

    this._numberOfCards = _a$(".column__card", column).length;

    return this.notify((view) =>
      view.numberOfCardsRender(this._numberOfCards, column)
    );
  }

  getNumberOfCards() {
    return this._numberOfCards;
  }

  // setTimeModified(create, modified) {
  //   this._timeModified = timeForToday(create, modified);

  //   return this.notyfi();
  // }

  // getTimeModified() {
  //   return this._timeModified;
  // }
}
