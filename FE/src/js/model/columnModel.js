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

    initialData.forEach((column, index) => {
      const { id, name, cards } = column;
      this.setColumnNameList(id, name, this._columnList[index]);
      this.setCardList(id, cards, this._columnList[index]);
    });
  }

  //map의 key로 id를 설정했는데 column으로 바꾸면??

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

  setCardList(columnId, card, column) {
    this._cardList.set(columnId, card);
    this.setNumberOfCards(columnId, card, column);

    return this._views.forEach((view) => view.cardListRender(card, column));
  }

  getCardList() {
    return this._cardList;
  }

  setNumberOfCards(columnId, card, column) {
    this._numberOfCards.set(columnId, card.length);

    return this._views.forEach((view) =>
      view.numberOfCardsRender(card.length, column)
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
