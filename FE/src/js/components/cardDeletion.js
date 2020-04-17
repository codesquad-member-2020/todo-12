import { Component } from "./component.js";
import { fetchData } from "../lib/util.js";


export class CardDeletion extends Component {
  constructor({ model }) {
    super();
    this.model = model;
    this.closetBtn = "card-delete-btn";
    this.card = ".column__card";
    this.selectionMessage = "선택하신 카드를 삭제하시겠습니까?"
  }

  addClickHandler({ target }) {
    if (target.dataset.type !== this.closetBtn) return;
    if (confirm(this.selectionMessage))
      return this.getCardInfo(target);
  }

  getCardInfo(target) {
    const currentCard = target.closest(this.card);
    const currentCardId = this.model.getCardList(currentCard).id;
    this.deleteData(currentCardId);
  }

  deleteData(id) {
    const url = `http://15.165.163.174:8080/card/${id}`;
    fetchData(url, "DELETE").then(() =>
      this.model.deleteCard(id)
    );

  }
}
