import { _$, __, _c, __$, _a$, fetchData, filterNumber } from "../lib/util.js";

export class CardMovement {
  constructor({ model }) {
    this.dragArea = ".column__cards";
    this.card = ".column__card";
    this.dragging = "dragging";
    this.model = model;
    this.model.subscribe(this.addEventHandler.bind(this));
  }

  addEventHandler() {
    const cards = _a$(this.card);
    const dragArea = _a$(this.dragArea);

    cards.forEach((draggable) => {
      __(draggable).on("dragstart", (e) => {
        console.log(draggable);
        _c(draggable).add(this.dragging);
      });

      __(draggable).on("dragend", () => {
        _c(draggable).remove(this.dragging);
      });
    });

    dragArea.forEach((cards) => {
      __(cards).on("dragover", (e) => {
        e.preventDefault();
        const afterElement = this.getDragAfterElement(cards, e.clientY);
        const draggable = _$("." + this.dragging);
        if (afterElement === null) {
          cards.appendChild(draggable);
        } else {
          cards.insertBefore(draggable, afterElement);
        }
      });
    });
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
