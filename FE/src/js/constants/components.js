export const creationInfo = {
  selector: {
    btnShowingAddForm: "btn-showing-creation",
    cardCreationInput: "card-creation-input",
    cancelCardBtn: "cancel-card-btn",
    addCardBtn: "add-card-btn",
    addCardForm: ".add__todo",
    borderFocus: "border-focus",
    column: ".todo__column",
  },
  option: {
    borderFocus: true,
    disabled: true,
  },
  fetchUrl: `http://15.165.163.174:8080/card/{columnId}`,
};

export const deletionInfo = {
  selector: {
    closetBtn: "card-delete-btn",
    card: ".column__card",
  },
  option: {
    confirm: true,
  },
  fetchUrl: `http://15.165.163.174:8080/card/{cardId}`,
  deletionMessage: "선택하신 카드를 삭제하시겠습니까?"
};

export const movementInfo = {
  selector: {
    dragArea: ".column__cards",
    card: ".column__card",
    dragging: "dragging",
    column: ".todo__column",
  },
  fetchUrl: `http://15.165.163.174/api/card/{cardId}/move/{columnId}/{cardIndex}`,
};

export const editInfo = {
  selector: {
    closeBtn: "edit-close-btn",
    wrap: "#wrap",
    card: ".column__card",
    modal: "#popup__todo",
    textarea: "popup__input",
    saveBtn: "edit-save-btn",
    borderFocus: "border-focus",
  },
  option: {
    borderFocus: true,
    disabled: true,
  },
  fetchUrl: `http://15.165.163.174/api/card/{cardId}`,
};

export const historyInfo = {
  selector: {
    wrap: "#wrap",
    historyBtn: "history-btn",
    history: "#activity-menu",
    historyCloseBtn: "history-close-btn",
    slideIn: "slide-in",
    slideOut: "slide-out",
    historyArea: ".activity-menu__list",
  },
  option: {
    borderFocus: true,
    disabled: true,
  },
  fetchUrl: `http://15.165.163.174/api//history`,
};
