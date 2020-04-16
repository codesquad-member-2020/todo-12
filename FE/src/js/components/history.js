import { _$, __, _c, fetchGetData } from "../lib/util.js";
import { timeForToday } from "../lib/timeForToday.js";
import { Component } from "./component.js";
import {
  templateHistoryMenu,
  templateHistoryFromTo,
  templateHistoryTo,
} from "../template/templateHistory.js";

export class History extends Component {
  constructor({ model }) {
    super();
    this.model = model;
    this.wrap = "#wrap";
    this.historyBtn = "history-btn";
    this.selectorHistory = "#activity-menu";
    this.historyCloseBtn = "history-close-btn";
    this.slideIn = "slide-in";
    this.slideOut = "slide-out";
    this.historyArea = ".activity-menu__list";
  }
  init() {
    this.historyMenuRender();
  }

  historyMenuRender() {
    const historyHtml = templateHistoryMenu();
    const historyArea = _$(this.wrap);
    historyArea.insertAdjacentHTML("beforeend", historyHtml);
    this.history = _$(this.selectorHistory);
  }

  addClickHandler({ target }) {
    const eventTarget = target.dataset.type;

    switch (eventTarget) {
      case this.historyBtn:
        this.onHistoryBtn();
        break;

      case this.historyCloseBtn:
        this.onCloseHistory();
        break;

      default:
        return;
    }
  }
  onHistoryBtn() {
    _c(this.history).add(this.slideIn);
    this.history.style.right = "0";
    __(this.history).show();

    this.fetchHistory();
    this.removeAnimation(this.slideIn);
  }

  onCloseHistory() {
    const historyWidth = this.history.offsetWidth;

    _c(this.history).add(this.slideOut);

    this.history.style.right = `-${historyWidth}px`;

    this.removeAnimation(this.slideOut);
  }

  removeAnimation(selector) {
    __(this.history).on("animationend", () => {
      _c(this.history).remove(selector);
    });
  }

  fetchHistory() {
    const historyUrl = `http://15.165.163.174/api//history`;

    fetchGetData(historyUrl).then((historyData) => {
      this.model.setHistory(historyData);
      this.historyRender(historyData);
    });
  }

  getHistoryHtml(historyInfo) {
    if (!historyInfo.fromCategory) {
      delete historyInfo.fromCategory;
      return templateHistoryTo(historyInfo);
    }

    return templateHistoryFromTo(historyInfo);
  }

  historyRender(historyData) {
    const reversedHistory = historyData.reverse();

    const historyHtmlList = reversedHistory.reduce(
      (historyList, historyInfo) => {
        let historyHtml = null;
        historyInfo.modifiedTime = timeForToday(historyInfo.modifiedTime);
        historyHtml = this.getHistoryHtml(historyInfo);
        return (historyList += historyHtml);
      },
      ""
    );

    _$(this.historyArea).innerHTML = historyHtmlList;
  }
}
