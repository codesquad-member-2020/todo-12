import { _$, __ } from "../lib/util.js";
// import { tplAddCard } from "../tpl.tpladdCard.js";

export class Column {
  constructor(columnView) {
    this.columnView = columnView;
    this.init();
  }
  //카드 추가

  //카드 갯수 세기
  //컬럼 선택시 input 포커스
  //컬럼 이름 변경
  //컬럼 추가

  init() {
    this.columnView.setHandler({
      handleAddCardBtn: this.handleAddCardBtn.bind(this),
      handleInputFocus: this.handleInputFocus.bind(this),
    });
  }

  // handleDeleteBtn() {}

  //1. 이벤트 달기
  //2. 데이터 패치이벤트 달아주기
  //3. 뷰를 불러서 추가 기능 달기

  handleAddCardBtn({ target, currentTarget }) {
    const addCardBtn = _$(".add-card-btn", currentTarget);
    if (target.parentNode !== addCardBtn) return;

    const addCard = ".add__todo";
    const currentAddCard = _$(addCard, currentTarget);

    __(currentAddCard).toggle();
  }

  handleInputFocus() {
    // btn.disabled = false;
  }

  setNumberOfCards(columnId) {
    const column = _$(`column-data-id${columnId}`);

    this._numberOfCards = _a$(".column__card", column).length;
    return this.columnView.numberOfCardsRender(columnId, this._numberOfCards);
  }
}
