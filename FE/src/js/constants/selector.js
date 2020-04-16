export const cardCreation = {
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
  },
  fetchUrl: `http://15.165.163.174:8080/card/{columnId}`,
};
