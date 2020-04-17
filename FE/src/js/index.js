import { templateHeader } from "./template/templateHeader.js";
import { _$, fetchData } from "./lib/util.js";
import { Controller } from "./card/controller.js";
import { View } from "./card/view.js";
import { CardCreation } from "./components/cardCreation.js";
import { CardMovement } from "./components/cardMovement.js";
import { CardDeletion } from "./components/cardDeletion.js";
import { EditCard } from "./components/editCard.js";
import { History } from "./components/history.js";
import { Model } from "./card/model.js";
// import { mock } from "./mock.js";

// import css from "../style/style.css";

function init() {
  const header = templateHeader();
  _$("#wrap").insertAdjacentHTML("afterbegin", header);

  const view = new View();
  const model = new Model({ view });
  const cardCreation = new CardCreation({ model });
  const cardDeletion = new CardDeletion({ model });
  const cardMovement = new CardMovement({ model });
  const editCard = new EditCard({ model });
  const history = new History({ model });
  const controller = new Controller({
    view,
    model,
    components: [cardCreation, cardDeletion, cardMovement, editCard, history],
  });

  controller.fetchInitialData();
}

function login() {
  const loginUrl = `http://13.124.5.39:8080/login`;
  const body = { userId: "todo12", password: "todo12" };

  const strBody = JSON.stringify(body);
  fetch(loginUrl, {
    method: "POST",
    mode: "cors",
    body: strBody,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((token) => {
      sessionStorage.setItem("token", token.jwt);
      console.log(token.jwt);
    });
  init();
}

// fetchData(loginUrl, "POST", JSON.stringify(body)).then((token) => {
//   console.log(token);
//   // const tokenHeader = `Authorization: ${token.data}`;
//   // a(tokenHeader);
//   init();
// });
// const tokenHeader = `Authorization: ${token}`;

window.addEventListener("DOMContentLoaded", login);
