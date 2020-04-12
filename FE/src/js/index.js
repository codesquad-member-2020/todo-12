import { tplHeader } from "./tpl/tplHeader.js";
import { _$, fetchGetData } from "./lib/util.js";
import { CardView } from "./card/cardView.js";
import { Column } from "./column/column.js";
import { AddCard } from "./column/addCard.js";
import { mock } from "./mock.js";

// import css from "../style/style.css";

function init() {
  const header = tplHeader();
  _$("#wrap").insertAdjacentHTML("afterbegin", header);

  const addCard = new AddCard();
  const column = new Column(addCard);
  const cardView = new CardView();
  // const card = new Card(cardView);
  fetchInitialData(cardView, column);
}

function fetchInitialData(cardView, column) {
  const url =
    "https://cors-anywhere.herokuapp.com/http://15.165.163.174:8080/mock";

  // fetchGetData(url).then((initialData) =>
  //   handleInitialData(initialData.categories, cardView, column)
  // );

  handleInitialData(mock.categories, cardView, column);
}

function handleInitialData(initialData, cardView, column) {
  initialData.forEach((columnData) => {
    const { id, name, cards } = columnData;

    column.columnRender(id);
    column.columnNameRender(id, name);
    cards.forEach((card) => cardView.cardRender(id, card));
    column.numberOfCardsRender(id);
  });

  column.addColumnRender();
}

window.addEventListener("DOMContentLoaded", init);
