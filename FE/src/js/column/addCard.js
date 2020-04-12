import { _$, __, _c, __$, _a$, fetchData, filterNumber } from "../lib/util.js";
export class AddCard {
  constructor() {
    this.btnShowingAddForm = "btn-showing-add-card";
    this.addCardInput = "add__input";
    this.cancelCardBtn = "cancel-card-btn";
    this.addCardBtn = "add-card-btn";
    this.addCardForm = ".add__todo";
    // this.fetchUrl = `https://cors-anywhere.herokuapp.com/http://15.165.163.174:8080/card/create/${categoryId}`;
  }

  addEventHandler({ target, currentTarget }) {
    const classList = target.classList;
    switch (true) {
      case classList.contains(this.btnShowingAddForm):
        this.onBtnShowingAddForm(currentTarget);
        break;
      case classList.contains(this.addCardInput):
        this.onInputEvents(currentTarget);
        break;
      case classList.contains(this.cancelCardBtn):
        this.onCancelCardBtn(currentTarget);
        break;
      case classList.contains(this.addCardBtn):
        this.onAddCardBtn(currentTarget);
    }
  }

  onBtnShowingAddForm(currentColumn) {
    const addForm = ".add__todo";
    const currentAddForm = _$(addForm, currentColumn);

    __(currentAddForm).toggle();
  }

  onInputEvents(currentColumn) {
    const addCardInput = _$("." + this.addCardInput, currentColumn);

    __(addCardInput).on("blur", () => _c(addCardInput).remove("input-active"));
    _c(addCardInput).add("input-active"); //함수로 만들기

    __(addCardInput).on("input", () =>
      this.onActivationAddCardBtn(addCardInput, currentColumn)
    );
  }

  onActivationAddCardBtn(addCardInput, currentColumn) {
    const addCardBtn = _$(".add-card-btn", currentColumn);

    if (!addCardInput.value) return (addCardBtn.disabled = true);
    addCardBtn.disabled = false;
  }

  onCancelCardBtn(currentColumn) {
    const closeBtn = _$(".btn-showing-add-card", currentColumn);
    closeBtn.click();
  }

  onAddCardBtn(currentColumn) {
    const columnId = filterNumber(currentColumn.id);
    const currentForm = _$(this.addCardForm, currentColumn);
    const addApi = `http://15.165.163.174:8080/card/create/${columnId}`;
    currentForm.action = addApi;

    //카드 추가
    //카드갯수추가
  }
}
