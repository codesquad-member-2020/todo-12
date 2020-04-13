import { tplHeader } from "./tpl/tplHeader.js";
import { _$, fetchGetData } from "./lib/util.js";
// import { Card } from "../../delete/card/card.js";
import { ColumnView } from "./column/columnView.js";
import { CardCreation } from "./column/cardCreation.js";
import { CardMovement } from "./column/cardMovement.js";
import { Model } from "./column/model.js";
import { mock } from "./mock.js";

// import css from "../style/style.css";

function init() {
  const header = tplHeader();
  _$("#wrap").insertAdjacentHTML("afterbegin", header);

  const columnView = new ColumnView();
  const model = new Model(columnView);
  const cardCreation = new CardCreation({ columnView, model });
  const cardMovement = new CardMovement();
  // const card = new Card();
  // const card = new Card(cardView);
  fetchInitialData(model, cardMovement);
}

function fetchInitialData(model, cardMovement) {
  const url = "http://15.165.163.174:8080/mock";

  fetchGetData(url).then((initialData) => {
    // columnView.init(initialData.categories);
    // card.init(initialData.categories);
  });
  // columnView.init(mock.categories);
  model.init(mock.categories);
  // card.init(mock.categories);

  cardMovement.addEventHandler();
}

window.addEventListener("DOMContentLoaded", init);
