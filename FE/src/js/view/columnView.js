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

    columnArea.innerHTML = columnsHtml;
  }

  columnNameRender(name, column) {
    //column을 돌며 column name을 추가해준다.
    const title = _$(".column__title", true, column);

    title.forEach((nameArea) => (nameArea.innerText = name));
    column.id = `todo__${name}`;
  }

  cardCountRender(name) {
    //section에 아이디 추가
    //column__card-count 모두가져와서 네임추가
  }
}
