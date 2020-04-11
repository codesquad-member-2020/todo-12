import { Model } from "./model.js";
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

    // initialData.forEach((column) => {
    //   const { id, name, cards } = column;
    //   this.setColumnNameList(id, name);
    //   this.setCardList(id, cards);
    // });
  }

  setColumnList(length) {
    const columnList = new Array(length);
    console.log(this._views);
    this._views.forEach((view) => view.columnRender([...columnList]));
  }

  setColumnNameList(id, name) {
    //변화가 있을때 => 칼럼 제목, 카드카운트, 카드
    if (this._columnNameList.has(name)) return;

    this._columnNameList.set(id, name);

    return this.notyfi(columnNameRender, name);
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
