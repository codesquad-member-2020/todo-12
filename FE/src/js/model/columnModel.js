import { timeForToday } from "../utils/timeForToday";

class columnModel extends model {
  constructor() {
    super();
    this._columnNameList = new Map();
    this._cardList = new Map();
  }

  handleInitialData(initialData) {
    //categories 변수화?
    initialData.categories.forEach((column) => {
      const { id, name, cards } = column;
      this.setColumnNameList(id, name);
      this.setCardList(id, cards);
    });
  }

  setColumnNameList(id, name) {
    //변화가 있을때 => 칼럼 제목, 카드카운트, 카드
    if (this._columnNameList.has(name)) return;

    this._columnNameList.set(id, name);

    return this.notyfi(nameRender, name);
  }

  getColumnNameList() {
    return this._columnNameList;
  }

  setCardList(columnId, card) {
    this._cardList.set(columnId, card);

    return this.notyfi(columnId, card);
  }

  getCardList() {
    return this._cardList;
  }

  setCardCount() {
    this._cardCount = this._cardList.size;
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
