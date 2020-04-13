import { _$, __, _c, __$, _a$ } from "../lib/util.js";

export class Model {
  constructor(view) {
    this.view = view;
    this.columnList = new Map();
    this.columnNameList = new Map();
    this.cardList = new Map();
    this.numberOfCardList = new Map();
    this.cardArea = ".column__card";
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
  }

  setColumnList(id) {
    this.view.columnRender(id);

    const column = _$(`#column-data-id-${id}`);
    this.columnList.set(id, column);
  }

  getColumnList() {
    return this.columnList;
  }

  setColumnNameList(id, name) {
    //변화가 있을때 => 칼럼 제목, 카드카운트, 카드
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

    // this.cardList.set(cardId, { columnId });
    return this.view.cardRender(card, column);
  }

  getCardList() {
    return this.cardList;
  }

  setNumberOfCard(id) {
    const column = this.columnList.get(id);
    const numberOfCard = _a$(this.cardArea, column).length;

    this.numberOfCardList.set(id, numberOfCard);
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
