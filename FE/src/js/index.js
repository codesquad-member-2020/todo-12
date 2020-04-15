import { tplHeader } from "./tpl/tplHeader.js";
import { _$, fetchGetData } from "./lib/util.js";
// import { Card } from "../../delete/card/card.js";
import { ColumnView } from "./column/columnView.js";
import { CardCreation } from "./column/cardCreation.js";
import { CardMovement } from "./column/cardMovement.js";
import { CardDeletion } from "./column/cardDeletion.js";
import { Model } from "./column/model.js";
// import { mock } from "./mock.js";

// import css from "../style/style.css";

function init() {
  const header = tplHeader();
  _$("#wrap").insertAdjacentHTML("afterbegin", header);

  const columnView = new ColumnView();
  const model = new Model(columnView);
  const cardCreation = new CardCreation({ columnView, model });
  const cardDeletion = new CardDeletion({ columnView, model });
  const cardMovement = new CardMovement({ model });
  // const card = new Card();
  // const card = new Card(cardView);
  model.fetchinitialData();
}

function fetchInitialData(model) {
  const url = "http://15.165.163.174:8080";
  // const url = "http://15.165.163.174/api";

  fetchGetData(url).then((initialData) => {
    model.init(initialData);
  });

  // model.init(mock.categories);
}

window.addEventListener("DOMContentLoaded", init);
