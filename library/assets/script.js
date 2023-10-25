class Library {
  addBookBtn = document.getElementById("addBookBtn");
  bookDialog = document.getElementById("bookDialog");
  bookForm = document.getElementById("bookForm");
  bookGrid = document.getElementById("bookGrid");

  constructor() {
    this.books = [];
  }

  addBookBtnHandler() {
    this.addBookBtn.onclick = () => bookDialog.showModal();
  }

  bookFormHandler() {
    this.bookForm.onsubmit = (e) => {
      e.preventDefault();
      this.getBookFormData();
      this.bookGrid.appendChild(this.createCardFromLatestBook());
      this.bookForm.reset();
      this.bookDialog.close();
    };
  }

  getBookFormData() {
    const title = document.getElementById("titleInput").value;
    const author = document.getElementById("authorInput").value;
    const pages = document.getElementById("pagesInput").value;
    const hasRead = document.getElementById("hasReadInput").checked;

    this.books.push(new Book(title, author, pages, hasRead));
  }

  createCardFromLatestBook() {
    const card = document.createElement("div");
    card.classList.add("bookCard");

    for (let [type, value] of Object.entries(this.books.at(-1))) {
      if (type === "hasRead") card.appendChild(this.createCardButtons(value));
      else card.appendChild(this.createCardP(type, value));
    }

    return card;
  }

  createCardP(type, value) {
    const pElement = document.createElement("p");
    pElement.classList.add(type);
    pElement.textContent = type === "pages" ? `${value} pages` : value;

    return pElement;
  }

  createCardButtons(hasRead) {
    const cardButtons = document.createElement("div");
    cardButtons.classList.add("cardBtns");

    cardButtons.appendChild(this.createReadBtn(hasRead));
    cardButtons.appendChild(this.createRemoveBtn());

    return cardButtons;
  }

  createReadBtn(hasRead) {
    const readBtn = document.createElement("button");
    readBtn.classList.add("readBtn");
    readBtn.addEventListener("click", () => readBtn.classList.toggle("read"));

    if (hasRead) readBtn.classList.add("read");
    readBtn.textContent = "Read";

    return readBtn;
  }

  createRemoveBtn() {
    const removeBtn = document.createElement("button");
    removeBtn.addEventListener("click", (e) =>
      e.currentTarget.parentNode.parentNode.remove(),
    );
    removeBtn.textContent = "Remove";

    return removeBtn;
  }
}

class Book {
  constructor(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
  }
}

const myLibrary = new Library();

myLibrary.addBookBtnHandler();
myLibrary.bookFormHandler();
