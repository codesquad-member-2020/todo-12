import { _$, __, _c } from "../lib/util.js";
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
      btnShowingAddFormHandler: this.onBtnShowingAddForm.bind(this),
      addCardInputFocusHandler: this.onAddCardInputFocus.bind(this),
      addCardInputBlurHandler: this.onAddCardInputBlur.bind(this),
      addCardActivationBtnHandler: this.onAddCardActivationBtn.bind(this),
      cancelCardBtnHandler: this.onCancelCardBtn.bind(this),
      // handleAddCardBtn
    });
  }

  // handleDeleteBtn() {}

  //1. 이벤트 달기
  //2. 데이터 패치이벤트 달아주기
  //3. 뷰를 불러서 추가 기능 달기

  onBtnShowingAddForm({ target, currentTarget }) {
    const btnShowingAddForm = _$(".btn-showing-add-card", currentTarget);
    if (target !== btnShowingAddForm) return;

    const addForm = ".add__todo";
    const currentAddForm = _$(addForm, currentTarget);

    __(currentAddForm).toggle();
  }

  onAddCardInputFocus({ target, currentTarget }) {
    const addCardInput = _$(".add__input", currentTarget);
    if (target !== addCardInput) return;

    return _c(target).add("input-active"); //뷰가 담당?
    // btn.disabled = false;
  }

  onAddCardInputBlur({ target }) {
    return _c(target).remove("input-active"); //뷰가 담당?
  }

  onAddCardActivationBtn({ target, currentTarget }) {
    const addCardInput = _$(".add__input", currentTarget);
    const addCardBtn = _$(".add-card-btn", currentTarget);
    if (target !== addCardInput) return;

    if (!addCardInput.value) return (addCardBtn.disabled = true);
    addCardBtn.disabled = false;
  }

  onCancelCardBtn({ target, currentTarget }) {
    const cancelCardBtn = _$(".cancel-card-btn", currentTarget);
    const closeBtn = _$(".btn-showing-add-card", currentTarget);
    if (target !== cancelCardBtn) return;
    closeBtn.click();
  }

  setNumberOfCards(columnId) {
    const column = _$(`column-data-id${columnId}`);

    this._numberOfCards = _a$(".column__card", column).length;
    return this.columnView.numberOfCardsRender(columnId, this._numberOfCards);
  }
}
