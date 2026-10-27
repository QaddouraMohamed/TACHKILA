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

//field consts -_-
const gb_num = document.querySelector("#gb_num");
const gb_player = document.querySelector("#gb_player");
const dg_num = document.querySelector("#dg_num");
const dg_player = document.querySelector("#dg_player");
const dc1_num = document.querySelector("#dc1_num");
const dc1_player = document.querySelector("#dc1_player");
const dc2_num = document.querySelector("#dc2_num");
const dc2_player = document.querySelector("#dc2_player");
const dd_num = document.querySelector("#dd_num");
const dd_player = document.querySelector("#dd_player");
const mg_num = document.querySelector("#mg_num");
const mg_player = document.querySelector("#mg_player");
const mc1_num = document.querySelector("#mc1_num");
const mc1_player = document.querySelector("#mc1_player");
const mc2_num = document.querySelector("#mc2_num");
const mc2_player = document.querySelector("#mc2_player");
const md_num = document.querySelector("#md_num");
const md_player = document.querySelector("#md_player");
const bu1_num = document.querySelector("#bu1_num");
const bu1_player = document.querySelector("#bu1_player");
const bu2_num = document.querySelector("#bu2_num");
const bu2_player = document.querySelector("#bu2_player");

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
  let found = false;
  for (const player of team) {
    if (Number(data.number) === player.number) {
      found = true;
      break;
    }
  }
  if (found) {
    document.querySelector("#num_taken_add").classList.remove("hidden");
  } else {
    document.querySelector("#num_taken_add").classList.add("hidden");
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
  }
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
        clean_field(team[i]);
        switch (player_position) {
          case "GB":
            console.log(team[i].right_now);
            add_to_field(player_position, gb_num, gb_player, team[i]);
            console.log(team[i].right_now);
            break;
          case "DG":
            add_to_field(player_position, dg_num, dg_player, team[i]);
            break;
          case "DC_1":
            add_to_field(player_position, dc1_num, dc1_player, team[i]);
            break;
          case "DC_2":
            add_to_field(player_position, dc2_num, dc2_player, team[i]);
            break;
          case "DD":
            add_to_field(player_position, dd_num, dd_player, team[i]);
            break;
          case "MG":
            add_to_field(player_position, mg_num, mg_player, team[i]);
            break;
          case "MC_1":
            add_to_field(player_position, mc1_num, mc1_player, team[i]);
            break;
          case "MC_2":
            add_to_field(player_position, mc2_num, mc2_player, team[i]);
            break;
          case "MD":
            add_to_field(player_position, md_num, md_player, team[i]);
            break;
          case "BU_1":
            add_to_field(player_position, bu1_num, bu1_player, team[i]);
            break;
          case "BU_2":
            add_to_field(player_position, bu2_num, bu2_player, team[i]);
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
  let found = false;
  for (const player of team) {
    if (Number(data.number) === player.number && player.id !== player_id) {
      found = true;
      console.log(1);
      break;
    }
  }
  if (found) {
    document.querySelector("#num_taken_modify").classList.remove("hidden");
  } else {
    document.querySelector("#num_taken_modify").classList.add("hidden");
    for (let i = 0; i < team.length; i++) {
      if (team[i].id === player_id) {
        team[i].name = data.name;
        team[i].position = data.position;
        team[i].number = Number(data.number);
        if (team[i].right_now != "") {
          clean_field(team[i]);
        }
        break;
      }
    }
    aside.querySelectorAll(".player").forEach((player) => player.remove());
    team.forEach((player) => {
      add_to_aside(player);
    });
    player_id = 0;
    close_modify();
  }
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
  const posts = clone.querySelector(".posts");
  if (player.position === "Gardien") {
    posts.innerHTML += `
    <option value="GB" class="gb">GB-Gardien</option>
    `;
  } else if (player.position === "Defenseur") {
    posts.innerHTML += `
      <option value="DG" class="dg">DG-Defenseur gauche</option>
      <option value="DC_1" class="dc_1">DC - Défenseur central 1</option>
      <option value="DC_2" class="dc_2">DC - Défenseur central 2</option>
      <option value="DD" class="dd">DD - Défenseur droit</option>
    `;
  } else if (player.position === "Milieu") {
    posts.innerHTML += `
      <option value="MG" class="mg">MG - Milieu gauche</option>
      <option value="MC_1" class="mc_1">MC - Milieu central 1</option>
      <option value="MC_2" class="mc_2">MC - Milieu central 2</option>
      <option value="MD" class="md">MD - Milieu droit</option>
    `;
  } else if (player.position === "Attaquant") {
    posts.innerHTML += `
      <option value="BU_1" class="bu_1">BU - Buteur 1</option>
      <option value="BU_2" class="bu_2">BU - Buteur 2</option>
    `;
  }
  aside.append(clone);
}

function clean_field(player) {
  switch (player.right_now) {
    case "GB":
      gb_num.textContent = "N";
      gb_player.textContent = "Player";
      break;
    case "DG":
      dg_num.textContent = "N";
      dg_player.textContent = "Player";
      break;
    case "DC_1":
      dc1_num.textContent = "N";
      dc1_player.textContent = "Player";
      break;
    case "DC_2":
      dc2_num.textContent = "N";
      dc2_player.textContent = "Player";
      break;
    case "DD":
      dd_num.textContent = "N";
      dd_player.textContent = "Player";
      break;
    case "MG":
      mg_num.textContent = "N";
      mg_player.textContent = "Player";
      break;
    case "MC_1":
      mc1_num.textContent = "N";
      mc1_player.textContent = "Player";
      break;
    case "MC_2":
      mc2_num.textContent = "N";
      mc2_player.textContent = "Player";
      break;
    case "MD":
      md_num.textContent = "N";
      md_player.textContent = "Player";
      break;
    case "BU_1":
      bu1_num.textContent = "N";
      bu1_player.textContent = "Player";
      break;
    case "BU_2":
      bu2_num.textContent = "N";
      bu2_player.textContent = "Player";
      break;
    default:
      break;
  }
}

function add_to_field(post, post_num, post_name, player) {
  if (post_num.textContent == "N" && post_name.textContent == "Player") {
    post_num.textContent = player.number;
    post_name.textContent = player.name;
    player.right_now = post;
  } else {
    document.querySelector("#place_occupe_err").classList.remove("hidden");
    setTimeout(() => {
      document.querySelector("#place_occupe_err").classList.add("hidden");
    }, 1500);
  }
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
