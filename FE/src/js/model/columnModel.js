import { Model } from "./model.js";
import { _$, __, _c, __$ } from "../utils/util.js";
import { timeForToday } from "../utils/timeForToday.js";

export class ColumnModel extends Model {
  constructor(...views) {
    super(...views);
    this._columnNameList = new Map();
    this._cardList = new Map();
    this._numberOfCards = new Map();
  }

  handleInitialData(initialData) {
    const columnLength = initialData.length;
    this.setColumnList(columnLength);

    initialData.forEach((columnData, index) => {
      const { id, name, cards } = columnData;
      const currentColumn = this._columnList[index];

      this.setColumnNameList(id, name, currentColumn);
      this.setCardList(cards, currentColumn);
    });
  }

  setColumnList(length) {
    const columnList = new Array(length);
    this.notify((view) => view.columnRender([...columnList]));

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

  setNumberOfCards({ length }, column) {
    this._numberOfCards.set(column, length);

    return this.notify((view) => view.numberOfCardsRender(length, column));
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
