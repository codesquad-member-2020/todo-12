import { _$, __, _c, __$, _a$, fetchData } from "../lib/util.js";
export class CardCreation {
  constructor({ columnView, model }) {
    this.btnShowingAddForm = "js-btn-showing-creation";
    this.cardCreationInput = "js-card-creation-input";
    this.cancelCardBtn = "js-cancel-card-btn";
    this.addCardBtn = "js-add-card-btn";
    this.addCardForm = ".add__todo";
    this.model = model;
    this.columnView = columnView;
    this.columnView.subscribe(this.addEventHandler.bind(this));
  }

  addEventHandler({ target, currentTarget }) {
    const classList = target.classList;
    switch (true) {
      case classList.contains(this.btnShowingAddForm):
        this.onBtnShowingAddForm(currentTarget);
        break;
      case classList.contains(this.cardCreationInput):
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
    const currentAddForm = _$(this.addCardForm, currentColumn);

    __(currentAddForm).toggle();
  }

  onInputEvents(currentColumn) {
    const cardCreationInput = _$("." + this.cardCreationInput, currentColumn);
    __(cardCreationInput).on("blur", () =>
      _c(cardCreationInput).remove("input-active")
    );
    _c(cardCreationInput).add("input-active"); //함수로 만들기

    __(cardCreationInput).on("input", () =>
      this.onActivationAddCardBtn(cardCreationInput, currentColumn)
    );
  }

  onActivationAddCardBtn(cardCreationInput, currentColumn) {
    const addCardBtn = _$("." + this.addCardBtn, currentColumn);

    if (!cardCreationInput.value) return (addCardBtn.disabled = true);
    addCardBtn.disabled = false;
  }

  onCancelCardBtn(currentColumn) {
    const closeBtn = _$("." + this.btnShowingAddForm, currentColumn);
    const cardCreationInput = _$("." + this.cardCreationInput, currentColumn);

    closeBtn.click();
    cardCreationInput.value = "";
  }

  onAddCardBtn(currentColumn) {
    const columnId = currentColumn.dataset.id;
    const currentForm = _$(this.addCardForm, currentColumn);
    const creationUrl = `http://15.165.163.174:8080/card/${columnId}`;
    const cardCreationInput = _$("." + this.cardCreationInput, currentColumn);

    const value = currentForm.content.value;
    const jsonBody = { content: value };

    fetchData(creationUrl, "POST", JSON.stringify(jsonBody)).then((data) => {
      this.model.setCardList(columnId, data);
      this.model.setCardLength(columnId);
    });
    cardCreationInput.value = "";

    //모델에게 ('add'와 컨텐츠와 컬럼정보를 넘겨준다 -아이디)객체로

    //모델은 액션에게 전달  받은 아이디로
  }
}
