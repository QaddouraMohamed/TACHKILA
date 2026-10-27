import { team } from "./data.js";

const aside = document.querySelector("aside");
const players_template = document.querySelector("#players_template");

const ajouter_btn = document.querySelector("#ajouter_btn");
const ajouter = document.querySelector("#ajouter");
const quit_add = document.querySelectorAll(".quit_add");
const form_ajouter = document.querySelector("#form_ajouter");

const modifier = document.querySelector("#modifier");
const quit_modify = document.querySelectorAll(".quit_modify");
const form_modifier = document.querySelector("#form_modifier");

const supprimer = document.querySelector("#supprimer");
const quit_supprimer = document.querySelectorAll(".quit_supprimer");
const form_supprimer = document.querySelector("#form_supprimer");

let player_to;
let player_id = 0;
let player_position;
let id = 0;

if (team.length >= 1) {
  id = team[team.length - 1].id + 1;
} else {
  id = 0;
}

players_num();

team.forEach((player) => {
  add_to_aside(player);
});

ajouter_btn.addEventListener("click", toggle_add);
quit_add.forEach((btn) => {
  btn.addEventListener("click", toggle_add);
});

form_ajouter.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form_ajouter));
  const new_player = {
    id: id++,
    name: data.name,
    number: Number(data.number),
    position: data.position,
  };
  team.push(new_player);
  players_num();
  add_to_aside(new_player);
  toggle_add();
});

aside.addEventListener("click", (event) => {
  if (event.target.closest(".modifier_btn")) {
    player_to = event.target.closest(".player");
    player_id = Number(player_to.dataset.id);
    open_modify();
    for (let i = 0; i < team.length; i++) {
      if (team[i].id === player_id) {
        form_modifier.elements.name.value = team[i].name;
        form_modifier.elements.position.value = team[i].position;
        form_modifier.elements.number.value = team[i].number;
        break;
      }
    }
  }

  if (event.target.closest(".supprimer_btn")) {
    player_to = event.target.closest(".player");
    player_id = Number(player_to.dataset.id);
    open_supprimer();
  }
});

aside.addEventListener("change", (event) => {
  if (event.target.closest(".posts")) {
    player_to = event.target.closest(".player");
    player_id = Number(player_to.dataset.id);
    player_position = event.target.closest(".posts").value;
    for (let i = 0; i < team.length; i++) {
      if (player_id === team[i].id) {
        switch (player_position) {
          case "GB":
            document.querySelector("#gb_num").textContent = team[i].number;
            document.querySelector("#gb_player").textContent = team[i].name;
            break;
          case "DG":
            document.querySelector("#dg_num").textContent = team[i].number;
            document.querySelector("#dg_player").textContent = team[i].name;
            break;
          case "DC_1":
            document.querySelector("#dc1_num").textContent = team[i].number;
            document.querySelector("#dc1_player").textContent = team[i].name;
            break;
          case "DC_2":
            document.querySelector("#dc2_num").textContent = team[i].number;
            document.querySelector("#dc2_player").textContent = team[i].name;
            break;
          case "DD":
            document.querySelector("#dd_num").textContent = team[i].number;
            document.querySelector("#dd_player").textContent = team[i].name;
            break;
          case "MG":
            document.querySelector("#mg_num").textContent = team[i].number;
            document.querySelector("#mg_player").textContent = team[i].name;
            break;
          case "MC_1":
            document.querySelector("#mc1_num").textContent = team[i].number;
            document.querySelector("#mc1_player").textContent = team[i].name;
            break;
          case "MC_2":
            document.querySelector("#mc2_num").textContent = team[i].number;
            document.querySelector("#mc2_player").textContent = team[i].name;
            break;
          case "MD":
            document.querySelector("#md_num").textContent = team[i].number;
            document.querySelector("#md_player").textContent = team[i].name;
            break;
          case "BU_1":
            document.querySelector("#bu1_num").textContent = team[i].number;
            document.querySelector("#bu1_player").textContent = team[i].name;
            break;
          case "BU_2":
            document.querySelector("#bu2_num").textContent = team[i].number;
            document.querySelector("#bu2_player").textContent = team[i].name;
            break;
          default:
            break;
        }
      }
    }
  }
});

form_modifier.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form_modifier));
  for (let i = 0; i < team.length; i++) {
    if (team[i].id === player_id) {
      team[i].name = data.name;
      team[i].position = data.position;
      team[i].number = Number(data.number);
      break;
    }
  }
  aside.querySelectorAll(".player").forEach((player) => player.remove());
  team.forEach((player) => {
    add_to_aside(player);
  });
  player_id = 0;
  close_modify();
});

quit_modify.forEach((btn) => {
  btn.addEventListener("click", close_modify);
});

form_supprimer.addEventListener("submit", (event) => {
  event.preventDefault();
  for (let i = 0; i < team.length; i++) {
    if (team[i].id === player_id) {
      team.splice(i, 1);
      break;
    }
  }
  players_num();
  player_to.remove();
  player_id = 0;
  close_supprimer();
});

quit_supprimer.forEach((btn) => {
  btn.addEventListener("click", close_supprimer);
});
//------------------------------------------------

function players_num() {
  document.querySelector("#players_num").value = `${team.length} joueur(s)`;
}

function add_to_aside(player) {
  const clone = players_template.content.cloneNode(true);
  clone.querySelector(".player").dataset.id = player.id;
  clone.querySelector(".player_num").textContent = Number(player.number);
  clone.querySelector(".player_name").textContent = player.name;
  clone.querySelector(".player_post").textContent = player.position;
  aside.append(clone);
}

function toggle_add() {
  form_ajouter.reset();
  ajouter.classList.toggle("hidden");
}

function open_modify() {
  modifier.classList.remove("hidden");
}

function close_modify() {
  modifier.classList.add("hidden");
}

function open_supprimer() {
  supprimer.classList.remove("hidden");
}

function close_supprimer() {
  supprimer.classList.add("hidden");
}
