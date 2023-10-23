"use strict";

const addBookBtn = document.getElementById("addBookBtn");
const bookDialog = document.getElementById("bookDialog");
const bookForm = document.getElementById("bookForm");
const bookGrid = document.getElementById("bookGrid");

let myLibrary = [];

addBookBtn.onclick = () => bookDialog.showModal();
bookForm.onsubmit = (e) => {
  e.preventDefault();
  myLibrary.push(getBookFormData());
  bookGrid.appendChild(createCard(myLibrary.at(-1)));
  bookForm.reset();
  bookDialog.close();
};

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

function getBookFormData() {
  const title = document.getElementById("titleInput").value;
  const author = document.getElementById("authorInput").value;
  const pages = document.getElementById("pagesInput").value;
  const hasRead = document.getElementById("hasReadInput").checked;

  return new Book(title, author, pages, hasRead);
}

function createCard(book) {
  const card = document.createElement("div");
  card.classList.add("bookCard");

  for (let [type, value] of Object.entries(book)) {
    if (type === "hasRead") card.appendChild(createCardButtons(value));
    else card.appendChild(createCardP(type, value));
  }

  return card;
}

function createCardP(type, value) {
  const pElement = document.createElement("p");
  pElement.classList.add(type);
  pElement.textContent = type === "pages" ? `${value} pages` : value;

  return pElement;
}

function createCardButtons(hasRead) {
  const cardButtons = document.createElement("div");
  cardButtons.classList.add("cardBtns");

  cardButtons.appendChild(createReadBtn(hasRead));
  cardButtons.appendChild(createRemoveBtn());

  return cardButtons;
}

function createReadBtn(hasRead) {
  const readBtn = document.createElement("button");
  readBtn.classList.add("readBtn");
  readBtn.addEventListener("click", () => readBtn.classList.toggle("read"));

  if (hasRead) readBtn.classList.add("read");
  readBtn.textContent = "Read";

  return readBtn;
}

function createRemoveBtn() {
  const removeBtn = document.createElement("button");
  removeBtn.addEventListener("click", (e) =>
    e.currentTarget.parentNode.parentNode.remove(),
  );
  removeBtn.textContent = "Remove";

  return removeBtn;
}
