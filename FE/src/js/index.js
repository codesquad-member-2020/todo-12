import { templateHeader } from "./template/templateHeader.js";
import { _$, fetchToken } from "./lib/util.js";
import { Controller } from "./column/controller.js";
import { View } from "./column/view.js";
import { CardCreation } from "./components/cardCreation.js";
import { CardMovement } from "./components/cardMovement.js";
import { CardDeletion } from "./components/cardDeletion.js";
import { CardEdit } from "./components/cardEdit.js";
import { History } from "./components/history.js";
import { Model } from "./column/model.js";
import { creationInfo, deletionInfo, movementInfo, editInfo, historyInfo } from "./constants/components.js"
import { controllerInfo, modelInfo, viewInfo } from "./constants/column.js"

import css from "../style/style.css";

function init() {
  const header = templateHeader();
  _$("#wrap").insertAdjacentHTML("afterbegin", header);

  const view = new View(viewInfo);
  const model = new Model({ view, modelInfo });
  const cardCreation = new CardCreation({ model, creationInfo });
  const cardDeletion = new CardDeletion({ model, deletionInfo });
  const cardMovement = new CardMovement({ model, movementInfo });
  const editCard = new CardEdit({ model, editInfo });
  const history = new History({ model, historyInfo });
  const controller = new Controller({
    view,
    model,
    components: [cardCreation, cardDeletion, cardMovement, editCard, history],
    controllerInfo
  });

  controller.fetchInitialData();
}

function login() {
  const loginUrl = `http://13.124.5.39:8080/login`;
  const body = { userId: "todo12", password: "todo12" };

  fetchToken(loginUrl, "POST", body)
    .then(token => sessionStorage.setItem("token", token.jwt))

  init();
}


window.addEventListener("DOMContentLoaded", login);
