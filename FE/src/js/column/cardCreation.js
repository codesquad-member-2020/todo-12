import { _$, __, _c, __$, _a$, fetchData, filterNumber } from "../lib/util.js";
export class CardCreation {
  constructor({ columnView, model }) {
    this.btnShowingAddForm = "js-btn-showing-creation";
    this.cardCreationInput = "content";
    this.cancelCardBtn = "js-cancel-card-btn";
    this.addCardBtn = "js-add-card-btn";
    this.addCardForm = ".add__todo";
    this.model = model;
    this.columnView = columnView;
    this.columnView.subscribe(this.addEventHandler.bind(this));
  }

  addEventHandler({ target, currentTarget }) {
    switch (target.id) {
      case this.btnShowingAddForm:
        this.onBtnShowingAddForm(currentTarget);
        break;
      case this.cardCreationInput:
        this.onInputEvents(currentTarget);
        break;
      case this.cancelCardBtn:
        this.onCancelCardBtn(currentTarget);
        break;
      case this.addCardBtn:
        this.onAddCardBtn(currentTarget);
    }
  }

  onBtnShowingAddForm(currentColumn) {
    const currentAddForm = _$(this.addCardForm, currentColumn);

    __(currentAddForm).toggle();
  }

  onInputEvents(currentColumn) {
    const cardCreationInput = _$("#" + this.cardCreationInput, currentColumn);
    __(cardCreationInput).on("blur", () =>
      _c(cardCreationInput).remove("input-active")
    );
    _c(cardCreationInput).add("input-active"); //함수로 만들기

    __(cardCreationInput).on("input", () =>
      this.onActivationAddCardBtn(cardCreationInput, currentColumn)
    );
  }

  onActivationAddCardBtn(cardCreationInput, currentColumn) {
    const addCardBtn = _$("#" + this.addCardBtn, currentColumn);

    if (!cardCreationInput.value) return (addCardBtn.disabled = true);
    addCardBtn.disabled = false;
  }

  onCancelCardBtn(currentColumn) {
    const closeBtn = _$("#" + this.btnShowingAddForm, currentColumn);
    const cardCreationInput = _$("#" + this.cardCreationInput, currentColumn);

    closeBtn.click();
    cardCreationInput.value = "";
  }

  onAddCardBtn(currentColumn) {
    const columnId = filterNumber(currentColumn.id);
    const currentForm = _$(this.addCardForm, currentColumn);
    const creationUrl = `http://13.124.5.39:8080/card/${columnId}`;
    const cardCreationInput = _$("#" + this.cardCreationInput, currentColumn);

    const value = currentForm.content.value;
    const json = { content: value };

    fetchData(creationUrl, "POST", JSON.stringify(json)).then((data) => {
      this.model.setCardList(columnId, data);
      this.model.setNumberOfCard(columnId);
    });
    cardCreationInput.value = "";
  }
}
