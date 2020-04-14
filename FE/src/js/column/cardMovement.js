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

    //카드아이디, 컬럼아이디, 카드 몇번째인지
    //끝 카드아이디 , 컬럼아이디, 카테고리키 => 돔에 접근해서 배열에 몇번째 인지 받아온다.
    //카드아이디로 카드아이디 위치찾음 몇번 째 자식인지

    //시작 돔 접근 아이디 가져온다
    //

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
