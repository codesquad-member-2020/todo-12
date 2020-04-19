import { Component } from "./component.js";
import { fetchResponse } from "../lib/util.js";


export class CardDeletion extends Component {
  constructor({ model, deletionInfo }) {
    super();
    this.model = model;
    this.selector = deletionInfo.selector
    this.option = deletionInfo.option
    this.deletionUrl = deletionInfo.fetchUrl
    this.deletionMessage = deletionInfo.deletionMessage
  }

  addClickHandler({ target }) {
    if (target.dataset.type !== this.selector.closetBtn) return;

    if (this.option.confirm) return this.confirmDeletion(target);
    return this.getCardId(target);
  }

  confirmDeletion(target) {
    if (confirm(this.deletionMessage)) return this.getCardId(target);
  }

  getCardId(target) {
    const currentCard = target.closest(this.selector.card);
    const currentCardId = this.model.getCardList(currentCard).id;
    this.deleteData(currentCardId);
    return currentCardId;
  }

  deleteData(cardId) {
    const deletionUrl = this.deletionUrl.replace('{cardId}', cardId);
    fetchResponse(deletionUrl, "DELETE").then(() =>
      this.model.deleteCard(cardId)
    );
  }
}
