import { _$, __, _c, fetchData } from "../lib/util.js";
import { Component } from "./component.js";

export class CardCreation extends Component {
  constructor({ model, creationInfo }) {
    super();
    this.selector = creationInfo.selector;
    this.option = creationInfo.option;
    this.creationUrl = creationInfo.fetchUrl;
    this.model = model;
  }

  addClickHandler({ target }) {
    const currentColumn = target.closest(this.selector.column);

    const eventTarget = target.dataset.type;
    switch (eventTarget) {
      case this.selector.btnShowingAddForm:
        this.onBtnShowingAddForm(currentColumn);
        break;
      case this.selector.cardCreationInput:
        if (!this.option.borderFocus) return;
        this.onInputFocus(currentColumn);
        break;
      case this.selector.cancelCardBtn:
        this.onCancelCardBtn(currentColumn);
        break;
      case this.selector.addCardBtn:
        this.onAddCardBtn(currentColumn);
      default:
        return;
    }
  }

  onBtnShowingAddForm(currentColumn) {
    const currentAddForm = _$(this.selector.addCardForm, currentColumn);

    __(currentAddForm).toggle();
  }

  addInputHandler({ target }) {
    if (target.dataset.type !== this.selector.cardCreationInput) return;
    const currentColumn = target.closest(this.selector.column);

    const addCardBtn = _$("." + this.selector.addCardBtn, currentColumn);
    if (this.option.disabled) super.activateBtn(addCardBtn, target);
  }

  onInputFocus(currentColumn) {
    const cardCreationInput = _$("." + this.selector.cardCreationInput, currentColumn);
    super.addBorderFocusEvents(cardCreationInput, this.selector.borderFocus);
  }

  onCancelCardBtn(currentColumn) {
    const closeBtn = _$("." + this.selector.btnShowingAddForm, currentColumn);
    const cardCreationInput = _$("." + this.selector.cardCreationInput, currentColumn);

    closeBtn.click();
    cardCreationInput.value = "";
  }

  onAddCardBtn(currentColumn) {
    const columnId = this.model.getColumnId(currentColumn);
    const creationUrl = this.creationUrl.replace("{columnId}", columnId);

    const cardCreationInput = _$("." + this.selector.cardCreationInput, currentColumn);

    const inputValue = cardCreationInput.value;
    const jsonBody = { content: inputValue };

    fetchData(creationUrl, "POST", jsonBody).then((cardData) =>
      this.setCardData(columnId, cardData, currentColumn)
    );
    cardCreationInput.value = "";
  }

  setCardData(columnId, cardData, currentColumn) {
    this.model.setCardList(columnId, cardData);
    this.model.increaseCardLength(columnId);

    const currentAddBtn = _$("." + this.selector.addCardBtn, currentColumn);
    if (this.option.disabled) currentAddBtn.disabled = "disabled";
  }
}
