import { _$, __, _c, _a$, fetchData } from "../lib/util.js";
import { Component } from "./component.js";

export class CardCreation extends Component {
  constructor({ model }) {
    super();
    this.btnShowingAddForm = "btn-showing-creation";
    this.cardCreationInput = "card-creation-input";
    this.cancelCardBtn = "cancel-card-btn";
    this.addCardBtn = "add-card-btn";
    this.addCardForm = ".add__todo";
    this.inputFocus = "input-active";
    this.column = ".todo__column";
    this.model = model;
    // this.controller = controller;
    // this.controller.clickUnsubscribe(this.addEventHandler.bind(this));
  }

  addClickHandler({ target }) {
    const currentColumn = target.closest(this.column);

    const eventTarget = target.dataset.type;
    switch (eventTarget) {
      case this.btnShowingAddForm:
        this.onBtnShowingAddForm(currentColumn);
        break;
      case this.cardCreationInput:
        this.onInputFocus(currentColumn);
        break;
      case this.cancelCardBtn:
        this.onCancelCardBtn(currentColumn);
        break;
      case this.addCardBtn:
        this.onAddCardBtn(currentColumn);
      default:
        return;
    }
  }

  onBtnShowingAddForm(currentColumn) {
    const currentAddForm = _$(this.addCardForm, currentColumn);

    __(currentAddForm).toggle();
  }

  addInputHandler({ target }) {
    if (target.dataset.type !== this.cardCreationInput) return;
    const currentColumn = target.closest(this.column);

    const addCardBtn = _$("." + this.addCardBtn, currentColumn);
    super.activateBtn(addCardBtn, target);
  }

  onInputFocus(currentColumn) {
    const cardCreationInput = _$("." + this.cardCreationInput, currentColumn);
    super.addInputFocusEvents(cardCreationInput, this.inputFocus);
  }

  onCancelCardBtn(currentColumn) {
    const closeBtn = _$("." + this.btnShowingAddForm, currentColumn);
    const cardCreationInput = _$("." + this.cardCreationInput, currentColumn);

    closeBtn.click();
    cardCreationInput.value = "";
  }

  onAddCardBtn(currentColumn) {
    // const columnId = currentColumn.dataset.id;
    const columnId = this.model.getColumnId(currentColumn);
    const creationUrl = `http://15.165.163.174:8080/card/${columnId}`;

    const currentForm = _$(this.addCardForm, currentColumn);
    const cardCreationInput = _$("." + this.cardCreationInput, currentColumn);

    const value = currentForm.content.value;
    const jsonBody = { content: value };

    fetchData(creationUrl, "POST", JSON.stringify(jsonBody)).then((cardData) =>
      this.addCardData(columnId, cardData, currentColumn)
    );
    cardCreationInput.value = "";

    //모델에게 ('add'와 컨텐츠와 컬럼정보를 넘겨준다 -아이디)객체로

    //모델은 액션에게 전달  받은 아이디로
  }

  addCardData(columnId, cardData, currentColumn) {
    this.model.setCardList(columnId, cardData);
    this.model.increaseCardLength(columnId);

    const currentAddBtn = _$("." + this.addCardBtn, currentColumn);
    currentAddBtn.disabled = "disabled";
  }
}
