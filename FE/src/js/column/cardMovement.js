import { _$, __, _c, __$, _a$, fetchData } from "../lib/util.js";
//카드 이동시 애니매에션 추가하기

export class CardMovement {
  constructor({ model }) {
    this.dragArea = ".column__cards";
    this.card = ".column__card";
    this.dragging = "dragging";
    this.column = ".todo__column";
    this.model = model;
    this.model.subscribe(this.addEventHandler.bind(this));
  }

  addEventHandler() {
    const cards = _a$(this.card);
    const dragArea = _a$(this.dragArea);

    cards.forEach((draggable) => {
      __(draggable).on("dragstart", () => _c(draggable).add(this.dragging));

      __(draggable).on("dragend", () => this.onDragEnd(draggable));
    });

    dragArea.forEach((cards) => {
      __(cards).on("dragover", (event) => this.onDragover(event, cards));
    });
  }

  onDragEnd(draggable) {
    _c(draggable).remove(this.dragging);

    const {
      previousColumnId,
      previousCardIndex,
      cardId,
    } = this.getPreviousCardInfo(draggable);

    const { currentColumnId, currentCardIndex } = this.getCurrentCardInfo(
      draggable
    );

    const sameLocation =
      previousColumnId === currentColumnId &&
      previousCardIndex === currentCardIndex;

    if (sameLocation) return;

    this.fetchDataMovement(
      cardId,
      currentColumnId,
      currentCardIndex,
      previousColumnId
    );
  }

  getPreviousCardInfo(draggable) {
    const cardList = this.model.getCardList(draggable);

    const previousColumnId = cardList.columnId;
    const previousCardIndex = cardList.card.categoryKey;
    const cardId = cardList.id;

    return { previousColumnId, previousCardIndex, cardId };
  }

  getCurrentCardInfo(draggable) {
    const currentColumn = draggable.closest(this.column);
    const currentColumnId = currentColumn.dataset.columnId;

    const currentDragArea = _$(this.dragArea, currentColumn);
    const currentCardIndex = this.getChildIndex(draggable, currentDragArea);

    return { currentColumnId, currentCardIndex };
  }

  onDragover(event, cards) {
    event.preventDefault();

    const afterElement = this.getDragAfterElement(cards, event.clientY);
    const draggable = _$("." + this.dragging);

    if (afterElement === null) {
      cards.appendChild(draggable);
    } else {
      cards.insertBefore(draggable, afterElement);
    }
  }

  fetchDataMovement(cardId, columnId, cardIndex, previousColumnId) {
    const movementUrl = `http://15.165.163.174/api/card/${cardId}/move/${columnId}/${cardIndex}`;
    fetchData(movementUrl, "PUT").then((cardData) => {
      this.model.setCardList(columnId, cardData, true);
      this.model.increaseCardLength(columnId);
      this.model.decreaseCardLength(previousColumnId);
    });
  }

  getChildIndex(child, parent) {
    const children = [...parent.children].reverse();
    return children.indexOf(child);
  }

  getDragAfterElement(dragArea, y) {
    const currentDragArea = _a$(
      `${this.card}:not(.${this.dragging})`,
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
