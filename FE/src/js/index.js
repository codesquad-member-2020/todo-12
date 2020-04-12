import { tplHeader } from "./tpl/tplHeader.js";
import { _$, fetchGetData } from "./lib/util.js";
import { CardView } from "./card/cardView.js";
import { ColumnView } from "./column/columnView.js";
import { Column } from "./column/column.js";
import { mock } from "./mock.js";

// import css from "../style/style.css";

function init() {
  const header = tplHeader();
  _$("#wrap").insertAdjacentHTML("afterbegin", header);

  const columnView = new ColumnView();
  const column = new Column(columnView);
  const cardView = new CardView();
  // const card = new Card(cardView);
  fetchInitialData(cardView, column, columnView);
}

function fetchInitialData(cardView, column, columnView) {
  const url =
    "https://cors-anywhere.herokuapp.com/http://15.165.163.174:8080/mock";

  // fetchGetData(url).then((initialData) =>
  //   handleInitialData(initialData.categories, cardView, columnView)
  // );

  handleInitialData(mock.categories, cardView, columnView);
}

function handleInitialData(initialData, cardView, columnView) {
  initialData.forEach((columnData) => {
    const { id, name, cards } = columnData;

    columnView.columnRender(id);
    columnView.columnNameRender(id, name);
    cards.forEach((card) => cardView.cardRender(id, card));
    columnView.numberOfCardsRender(id, cards.length);
  });

  columnView.addColumnRender();
}

window.addEventListener("DOMContentLoaded", init);
