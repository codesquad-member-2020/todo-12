import { ColumnModel } from "./model/columnModel.js";
import { Controller } from "./controller/controller.js";
import { ColumnView } from "./view/columnView.js";
// import css from "../style/style.css";

function init() {
  const columnView = new ColumnView();
  const columnModel = new ColumnModel(columnView);
  const controller = new Controller({
    views: [columnView],
    models: { columnModel },
  });

  controller.init();
}

window.addEventListener("DOMContentLoaded", init);
