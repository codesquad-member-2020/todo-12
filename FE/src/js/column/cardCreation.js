import { _$, __, _c, __$, _a$, fetchData, filterNumber } from "../lib/util.js";
import { Observable } from "./observable.js";
export class CardCreation extends Observable {
  constructor() {
    super();
    this.btnShowingAddForm = "js-btn-showing-creation";
    this.addCardInput = "content";
    this.cancelCardBtn = "js-cancel-card-btn";
    this.addCardBtn = "js-add-card-btn";
    this.addCardForm = ".add__todo";
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
    console.log(addCardInput);
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
    const addCardInput = _$("." + this.addCardInput, currentColumn);

    closeBtn.click();
    addCardInput.value = "";
  }

  onAddCardBtn(currentColumn) {
    event.preventDefault();
    const columnId = filterNumber(currentColumn.id);
    const currentForm = _$(this.addCardForm, currentColumn);
    const addUrl = `http://15.165.163.174:8080/card/create/${columnId}`;

    const value = currentForm.content.value;
    const json = { content: value };

    // fetchData(addUrl, "POST", JSON.stringify(json));
    this.notify(columnId, json);
  }
}
