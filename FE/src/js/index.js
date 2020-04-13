import { tplHeader } from "./tpl/tplHeader.js";
import { _$, fetchGetData } from "./lib/util.js";
import { Card } from "./card/card.js";
import { Column } from "./column/column.js";
import { AddCard } from "./column/addCard.js";
import { mock } from "./mock.js";

// import css from "../style/style.css";

function init() {
  const header = tplHeader();
  _$("#wrap").insertAdjacentHTML("afterbegin", header);

  const addCard = new AddCard();
  const column = new Column(addCard);
  const card = new Card();
  // const card = new Card(cardView);
  fetchInitialData(card, column);
}

function fetchInitialData(card, column) {
  const url =
    "https://cors-anywhere.herokuapp.com/http://15.165.163.174:8080/mock";

  fetchGetData(url).then((initialData) => {
    column.init(initialData.categories);
    card.init(initialData.categories);
  });
  // column.init(mock.categories);
  // card.init(mock.categories);
}

window.addEventListener("DOMContentLoaded", init);
