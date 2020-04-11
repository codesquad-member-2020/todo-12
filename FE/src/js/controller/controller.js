import { fetchData } from "../utils/util.js";

export class Controller {
  constructor({ views, models }) {
    this._view = [...views];
    this._columnModel = models.columnModel;
    console.log(this._columnModel, this._view);
  }

  init() {
    const url =
      "https://cors-anywhere.herokuapp.com/http://15.165.163.174:8080/mock";

    fetchData(url).then((initialData) =>
      this._columnModel.handleInitialData(initialData.categories)
    );

    //categories 변수화?

    //history fetch
  }
}

//   _handleResponseData({name, id}) {
//     if(name) this._columnModel.setColumnNameList(id, name);

// }

//카드 갯수센다
//컬럼랜더링한다
//끝났다고 알려주면 카드 에드버튼 랜더링

//카드 랜더링한다
//x버튼 이벤트
//card 드래그 이벤트
