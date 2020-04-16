import { _$, __, _c, fetchData } from "../lib/util.js";
import { Component } from "./component.js";
import { templateEditModal } from "../template/templateEditModal.js";

export class EditCard extends Component {
  constructor({ model }) {
    super();
    // this.controller = controller;
    // this.controller.dblclickNotify(this.addEventHandler.bind(this));
    this.model = model;
    this.closeBtn = "edit-close-btn";
    this.wrap = "#wrap";
    this.selectorCard = ".column__card";
    this.selectorModal = "#popup__todo"; //이름 수정하기
    this.selectorTextarea = "popup__input"; //이름 수정하기
    this.selectorSaveBtn = "edit-save-btn";
    this.inputFocus = true;
  }

  init() {
    this.render();
    this.modal = _$(this.selectorModal);
    this.textarea = _$("." + this.selectorTextarea);
    this.saveBtn = _$("." + this.selectorSaveBtn);
  }
  render() {
    const editHtml = templateEditModal();
    const editArea = _$(this.wrap);
    editArea.insertAdjacentHTML("beforeend", editHtml);
  }

  addDblclickHandler({ target }) {
    this.card = target.closest(this.selectorCard);
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
      case this.closeBtn:
        this.onCloseBtn();
        break;
      case this.selectorSaveBtn:
        this.onSaveBtn();
    }
  }

  onCloseBtn() {
    __(this.modal).hide();
  }

  onSaveBtn() {
    const body = { content: this.inputValue };
    const { cardId, columnId } = this.getCardInfo();
    const editUrl = `http://15.165.163.174:8080/card/${cardId}`;

    fetchData(editUrl, "PUT", JSON.stringify(body)).then((cardData) =>
      this.updateCardData(columnId, cardData)
    );
  }

  updateCardData(columnId, cardData) {
    this.onCloseBtn();
    this.model.setCardList(columnId, cardData, "update");
  }

  addInputHandler({ target }) {
    if (target.dataset.type !== this.selectorTextarea) return;

    super.activateBtn(this.saveBtn, this.textarea);
    this.inputValue = target.value;
  }
}
