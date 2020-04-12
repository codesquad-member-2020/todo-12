import { tplCard } from "../tpl/tplCard.js";
import { _$, __, _c, __$, _a$ } from "../lib/util.js";

export class CardView {
  constructor() {
    this.cardArea = ".column__cards";
  }
  //카드 포커스
  // 카드 이동
  //카드 수정
  //카드삭제

  cardRender(columnId, card) {
    const DATA_ID = `#column-data-id-`;

    const column = _$(`${DATA_ID}${columnId}`);
    const cardArea = _$(this.cardArea, column);
    const cardHtml = tplCard(card);

    cardArea.insertAdjacentHTML("afterbegin", cardHtml);
  }
}
