import { _$, __, _c, fetchData } from "../lib/util.js";
import { Component } from "./component.js";
import { templateEditModal } from "../template/templateEditModal.js";

export class CardEdit extends Component {
  constructor({ model, editInfo }) {
    super();
    this.model = model;
    this.selector = editInfo.selector;
    this.option = editInfo.option;
    this.editUrl = editInfo.fetchUrl;
  }

  init() {
    this.render();
    this.modal = _$(this.selector.modal);
    this.textarea = _$("." + this.selector.textarea);
    this.saveBtn = _$("." + this.selector.saveBtn);
  }
  render() {
    const editHtml = templateEditModal();
    const editArea = _$(this.selector.wrap);
    editArea.insertAdjacentHTML("beforeend", editHtml);
  }

  addDblclickHandler({ target }) {
    this.card = target.closest(this.selector.card);
    if (!this.card) return;

    __(this.modal).show();
    const { cardContent } = this.getCardInfo();

    this.textarea.value = cardContent;
  }

  getCardInfo() {
    const cardList = this.model.cardList.get(this.card);
    const cardData = cardList.cardData;
    const cardId = cardList.id;
    const columnId = cardList.columnId;
    const cardContent = cardData.content;

    return { cardId, cardContent, columnId };
  }

  addClickHandler({ target }) {
    const eventTarget = target.dataset.type;

    switch (eventTarget) {
      case this.selector.closeBtn:
        this.onCloseBtn();
        break;
      case this.selector.saveBtn:
        this.onSaveBtn();
        break;
      case this.selector.textarea:
        this.onInputFocus();
        break;
      default:
        return;
    }
  }

  onInputFocus() {
    if (this.option.borderFocus) super.addBorderFocusEvents(this.textarea, this.selector.borderFocus);
  }

  onCloseBtn() {
    return __(this.modal).hide();
  }

  onSaveBtn() {
    const body = { content: this.inputValue };
    const { cardId, columnId } = this.getCardInfo();
    const editUrl = this.editUrl.replace('{cardId}', cardId);

    fetchData(editUrl, "PUT", body).then((cardData) =>
      this.updateCardData(columnId, cardData)
    );
  }

  updateCardData(columnId, cardData) {
    this.onCloseBtn();
    this.model.setCardList(columnId, cardData, "update");
  }

  addInputHandler({ target }) {
    if (target.dataset.type !== this.selector.textarea) return;

    if (this.option.disabled) super.activateBtn(this.saveBtn, this.textarea);
    this.inputValue = target.value;
  }
}
