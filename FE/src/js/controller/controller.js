import { _$, __, _c, __$ } from "../util.js";

class Controller {
  constructor({ views, models }) {
    this._view = [...views];
    this._columnModel = models.columnModel;
  }

  init() {
    this.fetchData("http://15.165.163.174:8080/mock");
    //history fetch
  }

  fetchData(url, func) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => _handleResponseData(data.categories));
  }

  _handleInitialData(initialData) {
    this._columnModel.setColumnList(initialData);
    this._columnModel.setCardList(initialData);
  }

  _handleResponseData(data) {}
}

//카드 갯수센다
//컬럼랜더링한다
//끝났다고 알려주면 카드 에드버튼 랜더링

//카드 랜더링한다
//x버튼 이벤트
//card 드래그 이벤트
