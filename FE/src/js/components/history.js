import { _$, __, _c, fetchData } from "../lib/util.js";
import { timeForToday } from "../lib/timeForToday.js";
import { Component } from "./component.js";
import {
  templateHistoryMenu,
  templateHistoryFromTo,
  templateHistoryTo,
} from "../template/templateHistory.js";

export class History extends Component {
  constructor({ model, historyInfo }) {
    super();
    this.model = model;
    this.selector = historyInfo.selector;
    this.option = historyInfo.option;
    this.historyUrl = historyInfo.fetchUrl;
  }

  init() {
    this.historyMenuRender();
  }

  historyMenuRender() {
    const historyHtml = templateHistoryMenu();
    const historyArea = _$(this.selector.wrap);
    historyArea.insertAdjacentHTML("beforeend", historyHtml);
    this.history = _$(this.selector.history);
  }

  addClickHandler({ target }) {
    const eventTarget = target.dataset.type;

    switch (eventTarget) {
      case this.selector.historyBtn:
        this.onHistoryBtn();
        break;

      case this.selector.historyCloseBtn:
        this.onCloseHistory();
        break;

      default:
        return;
    }
  }
  onHistoryBtn() {
    _c(this.history).add(this.selector.slideIn);
    this.history.style.right = "0";
    __(this.history).show();

    this.fetchHistory();
    this.removeAnimation(this.selector.slideIn);
  }

  onCloseHistory() {
    const historyWidth = this.history.offsetWidth;

    _c(this.history).add(this.selector.slideOut);

    this.history.style.right = `-${historyWidth}px`;

    this.removeAnimation(this.selector.slideOut);
  }

  removeAnimation(selector) {
    __(this.history).on("animationend", () => {
      _c(this.history).remove(selector);
    });
  }

  fetchHistory() {
    fetchData(this.historyUrl, "GET").then((historyData) => {
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

    _$(this.selector.historyArea).innerHTML = historyHtmlList;
  }
}
