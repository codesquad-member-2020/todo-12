import css from "../style/style.css";

const menuBtn = document.querySelector(".header__menu-btn");
const menu = document.querySelector("#activity-menu");
menuBtn.addEventListener("click", () => {
  menu.classList.add("a");
  menu.style.display = "block";
  menu.style.right = "0";
});

const close = document.querySelector(".activity-menuu__column button");
close.addEventListener("click", () => {
  menu.style.display = "none";
});
