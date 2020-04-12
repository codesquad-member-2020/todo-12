export class Column {
  constructor(columnView) {
    this.columnView = columnView;
  }
  //카드 추가

  //카드 갯수 세기
  //컬럼 선택시 input 포커스
  //컬럼 이름 변경
  //컬럼 추가

  // init() {
  //   this.columnView.appendHandler({
  //     handleDeleteBtn: this.handleDeleteBtn.bind(this),
  //   });
  // }

  // handleDeleteBtn() {}

  setNumberOfCards(columnId) {
    const column = _$(`column-data-id${columnId}`);

    this._numberOfCards = _a$(".column__card", column).length;
    return this.columnView.numberOfCardsRender(columnId, this._numberOfCards);
  }
}
