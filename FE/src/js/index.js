import { templateHeader } from "./template/templateHeader.js";
import { _$, fetchGetData } from "./lib/util.js";
import { Controller } from "./controller.js";
import { View } from "./view.js";
import { CardCreation } from "./components/cardCreation.js";
import { CardMovement } from "./components/cardMovement.js";
import { CardDeletion } from "./components/cardDeletion.js";
import { Model } from "./model.js";
// import { mock } from "./mock.js";

// import css from "../style/style.css";

function init() {
  const header = templateHeader();
  _$("#wrap").insertAdjacentHTML("afterbegin", header);

  const view = new View();
  const model = new Model({ view });
  const controller = new Controller({ view, model });
  const cardCreation = new CardCreation({ controller, model });
  const cardDeletion = new CardDeletion({ controller, model });
  const cardMovement = new CardMovement({ controller, model });
  // const card = new Card();
  // const card = new Card(cardView);
  controller.fetchInitialData();
}

window.addEventListener("DOMContentLoaded", init);
