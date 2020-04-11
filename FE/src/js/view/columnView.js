import { tplColumn, tplAddColumn } from "../tpl/columnTpl.js";
import { _$, __, _c, __$ } from "../utils/util.js";

export class ColumnView {
  constructor() {}

  columnRender(columnList) {
    const columnArea = _$("#todo");
    let columnsHtml = columnList.reduce(
      (column) => (column += tplColumn()),
      ""
    );
    if (tplAddColumn) columnsHtml += tplAddColumn();
    console.log(columnsHtml);

    columnArea.innerHTML = columnsHtml;
  }

  columnNameRender(name) {
    //section에 아이디 추가
    //column__title 모두가져와서 네임추가
  }

  cardCountRender(name) {
    //section에 아이디 추가
    //column__card-count 모두가져와서 네임추가
  }
}
