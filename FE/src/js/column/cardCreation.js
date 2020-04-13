import { _$, __, _c, __$, _a$, fetchData, filterNumber } from "../lib/util.js";
export class CardCreation {
  constructor({ columnView, model }) {
    this.btnShowingAddForm = "js-btn-showing-creation";
    this.addCardInput = "content";
    this.cancelCardBtn = "js-cancel-card-btn";
    this.addCardBtn = "js-add-card-btn";
    this.addCardForm = ".add__todo";
    this.model = model;
    this.columnView = columnView;
    this.columnView.subscribe(this.addEventHandler.bind(this));
    // this.fetchUrl = `https://cors-anywhere.herokuapp.com/http://15.165.163.174:8080/card/create/${categoryId}`;
  }

  addEventHandler({ target, currentTarget }) {
    switch (target.id) {
      case this.btnShowingAddForm:
        this.onBtnShowingAddForm(currentTarget);
        break;
      case this.addCardInput:
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
    const addCardInput = _$("#" + this.addCardInput, currentColumn);
    __(addCardInput).on("blur", () => _c(addCardInput).remove("input-active"));
    _c(addCardInput).add("input-active"); //함수로 만들기

    __(addCardInput).on("input", () =>
      this.onActivationAddCardBtn(addCardInput, currentColumn)
    );
  }

  onActivationAddCardBtn(addCardInput, currentColumn) {
    const addCardBtn = _$("#" + this.addCardBtn, currentColumn);

    if (!addCardInput.value) return (addCardBtn.disabled = true);
    addCardBtn.disabled = false;
  }

  onCancelCardBtn(currentColumn) {
    const closeBtn = _$("#" + this.btnShowingAddForm, currentColumn);
    const addCardInput = _$("#" + this.addCardInput, currentColumn);

    closeBtn.click();
    addCardInput.value = "";
  }

  onAddCardBtn(currentColumn) {
    event.preventDefault();
    const columnId = filterNumber(currentColumn.id);
    const currentForm = _$(this.addCardForm, currentColumn);
    const addUrl = `http://15.165.163.174:8080/card/create/${columnId}`;
    const addCardInput = _$("#" + this.addCardInput, currentColumn);

    const value = currentForm.content.value;
    const json = { content: value };
    // fetchData(addUrl, "POST", JSON.stringify(json));
    this.model.setCardList(columnId, json);
    this.model.setNumberOfCard(columnId);
    addCardInput.value = "";
  }
}
