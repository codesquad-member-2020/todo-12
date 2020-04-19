import { _$, __, _c, _a$, fetchData } from "../lib/util.js";
import { Component } from "./component.js";

export class CardMovement extends Component {
  constructor({ model, movementInfo }) {
    super();
    this.selector = movementInfo.selector;
    this.option = movementInfo.option;
    this.movementUrl = movementInfo.fetchUrl;
    this.model = model;
    this.previousColumnId = null;
    this.previousCardIndex = null;
    this.currentColumnId = null;
    this.currentCardIndex = null;
    this.cardId = null;
  }
  init() {
    const dragArea = _a$(this.selector.dragArea);
    const cards = _a$(this.selector.card);
    this.onEvent(dragArea, cards);
  }

  onEvent(dragArea, cards) {

    cards.forEach((draggable) => {
      __(draggable).on("dragstart", () => _c(draggable).add(this.selector.dragging));

      __(draggable).on("dragend", () => this.onDragEnd(draggable));
    });

    dragArea.forEach((cards) => {
      __(cards).on("dragover", (event) => this.onDragover(event, cards));
    });
  }

  onDragEnd(draggable) {
    _c(draggable).remove(this.selector.dragging);

    this.getPreviousCardInfo(draggable);
    this.getCurrentCardInfo(draggable);

    const sameLocation =
      this.previousColumnId === this.currentColumnId &&
      this.previousCardIndex === this.currentCardIndex;

    if (sameLocation) return;
    const movementUrl = this.getMovementUrl();
    this.fetchDataMovement(movementUrl);
  }

  getPreviousCardInfo(draggable) {
    const cardList = this.model.getCardList(draggable);
    this.previousColumnId = cardList.columnId;
    this.previousCardIndex = cardList.cardData.categoryKey;
    this.cardId = cardList.id;
  }

  getCurrentCardInfo(draggable) {
    const currentColumn = draggable.closest(this.selector.column);
    this.currentColumnId = currentColumn.dataset.columnId;

    const currentDragArea = _$(this.selector.dragArea, currentColumn);
    this.currentCardIndex = this.getChildIndex(draggable, currentDragArea);
  }

  onDragover(event, cards) {
    event.preventDefault();

    const afterElement = this.getDragAfterElement(cards, event.clientY);
    const draggable = _$("." + this.selector.dragging);

    if (!afterElement) {
      cards.appendChild(draggable);
    } else {
      cards.insertBefore(draggable, afterElement);
    }
  }

  getMovementUrl() {
    const movementUrl = this.movementUrl
      .replace("{cardId}", this.cardId)
      .replace("{columnId}", this.currentColumnId)
      .replace("{cardIndex}", this.currentCardIndex)

    return movementUrl;
  }

  fetchDataMovement(movementUrl) {
    fetchData(movementUrl, "PUT").then((cardData) => {
      this.model.setCardList(this.currentColumnId, cardData, "move");
      this.model.increaseCardLength(this.currentColumnId);
      this.model.decreaseCardLength(this.previousColumnId);
    });
  }

  getChildIndex(child, parent) {
    const children = [...parent.children].reverse();
    return children.indexOf(child);
  }

  getDragAfterElement(dragArea, y) {
    const currentDragArea = _a$(
      `${this.selector.card}:not(.${this.selector.dragging})`,
      dragArea
    );

    const draggableElements = [...currentDragArea];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
}
