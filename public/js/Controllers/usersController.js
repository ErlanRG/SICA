"use strict";

let editBtn = document.getElementById("edit");
let addBtn = document.getElementById("add");
let deleteBtn = document.getElementById("delete");
let acceptBtn = document.getElementById("accept");
let cancelBtn = document.getElementById("cancel");

// To enable other buttons
editBtn.addEventListener("click", EnableButtons);
cancelBtn.addEventListener("click", DisableButtons);
addBtn.addEventListener("click", AddUsers);
deleteBtn.addEventListener("click", DeleteUsers);

function EnableButtons() {
  editBtn.style.display = "none";
  addBtn.style.display = "inline";
  deleteBtn.style.display = "inline";
  acceptBtn.style.display = "inline";
  cancelBtn.style.display = "inline";
}

function DisableButtons() {
  editBtn.style.display = "inline";
  addBtn.style.display = "none";
  deleteBtn.style.display = "none";
  acceptBtn.style.display = "none";
  cancelBtn.style.display = "none";
}
