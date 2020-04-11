import { Model } from "./model.js";
import { _$, __, _c, __$ } from "../utils/util.js";
import { timeForToday } from "../utils/timeForToday.js";

export class ColumnModel extends Model {
  constructor(...views) {
    super(...views);
    this._columnNameList = new Map();
    this._cardList = new Map();
    this._cardCount = new Map();
  }

  handleInitialData(initialData) {
    const columnLength = initialData.length;
    this.setColumnList(columnLength);

    initialData.forEach((column, index) => {
      const { id, name, cards } = column;
      this.setColumnNameList(id, name, this._columnList[index]);
      // this.setCardList(id, cards);
    });
  }

  setColumnList(length) {
    const columnList = new Array(length);
    this._views.forEach((view) => view.columnRender([...columnList]));
    return (this._columnList = [..._$(".todo__column", true)]);
  }

  getColumnList() {
    return this._columnNameList;
  }

  setColumnNameList(id, name, column) {
    //변화가 있을때 => 칼럼 제목, 카드카운트, 카드
    if (this._columnNameList.has(name)) return;

    this._columnNameList.set(id, name);
    return this._views.forEach((view) => view.columnNameRender(name, column));
  }

  getColumnNameList() {
    return this._columnNameList;
  }

  setCardList(columnId, card) {
    this._cardList.set(columnId, card);
    this.setCardCount(columnId, card);

    return this.notyfi(columnId, card);
  }

  getCardList() {
    return this._cardList;
  }

  setCardCount(columnId, card) {
    return this._cardCount.set(columnId, card.length);
  }

  getCardConut() {
    return this._cardCount;
  }

  setTimeModified(create, modified) {
    this._timeModified = timeForToday(create, modified);

    return this.notyfi();
  }

  getTimeModified() {
    return this._timeModified;
  }
}
