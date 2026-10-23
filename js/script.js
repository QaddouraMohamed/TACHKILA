const ajouter_btn = document.querySelector("#ajouter_btn");
const ajouter = document.querySelector("#ajouter");
const quit_add = document.querySelectorAll(".quit_add");

const modifier_btn = document.querySelector("#modifier_btn");
const modifier = document.querySelector("#modifier");
const quit_modify = document.querySelectorAll(".quit_modify");

ajouter_btn.addEventListener("click", toggle_add);
quit_add.forEach((btn) => {
  btn.addEventListener("click", toggle_add);
});

modifier_btn.addEventListener("click", toggle_modify);
quit_modify.forEach((btn) => {
  btn.addEventListener("click", toggle_modify);
});

function toggle_add() {
  ajouter.classList.toggle("hidden");
}

function toggle_modify() {
  modifier.classList.toggle("hidden");
}

