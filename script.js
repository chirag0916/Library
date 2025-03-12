const myLibrary =[];

function Book(title, author, pages, read){
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info= function() {
  if(this.read == false){
    console.log(`${this.title} by ${this.author}, ${this.pages} pages, not read yet`);
  }
  else {
    console.log(`${this.title} by ${this.author}, ${this.pages} pages, already read`);
  }
}

function addBookToLibrary() {
  displayBooks();
}

addBookToLibrary.prototype.addBook = function(book){
  myLibrary.push(book);
}

function displayBooks() {
  let bookContent = document.getElementById("bookContent");
  bookContent.innerHTML = "";

  myLibrary.forEach((book,index) => {
    const bookCard = document.createElement("div");
    let removeButton = document.createElement("button");
    removeButton.textContent="Remove Book";

    let readButton = document.createElement("button");
    readButton.textContent ="Change Read Status";
    bookCard.classList.add("bookCard");
    bookCard.innerHTML =`
    <h3>${book.title}</h3>
    <p><strong>Author:</strong> ${book.author}</p>
    <p><strong>Pages:</strong> ${book.pages}</p>
    <p><strong>Status:</strong> ${book.read ? "Already read" : "Not read yet"}</p>
    `;
    bookCard.appendChild(readButton);
    bookCard.appendChild(removeButton);

    readButton.addEventListener("click", function() {
      book.read = !book.read;
      displayBooks();
    })

    removeButton.addEventListener("click", function(){
      myLibrary.splice(index, 1);
      displayBooks();
      
    })
    bookContent.appendChild(bookCard);
  })
}

let addBookBtn = document.getElementById("addBookBtn");
let bookForm = document.getElementById("bookForm");

addBookBtn.addEventListener("click", function(){
  let form = document.createElement("form");
  
  let labelTitle = document.createElement("label");
  labelTitle.textContent = "Title:";
  let inputTitle = document.createElement("input");
  form.appendChild(labelTitle);
  form.appendChild(inputTitle);

  let labelAuthor = document.createElement("label");
  labelAuthor.textContent = "Author:";
  let inputAuthor = document.createElement("input");
  form.appendChild(labelAuthor);
  form.appendChild(inputAuthor);

  let labelPages = document.createElement("label");
  labelPages.textContent ="Pages:";
  let inputPages = document.createElement("input");
  form.appendChild(labelPages);
  form.appendChild(inputPages);

  let labelQuestion = document.createElement("label");
  labelQuestion.textContent ="Have you read this book?";

  let inputTrue = document.createElement("input");
  inputTrue.type ="radio";
  inputTrue.name ="answer";
  inputTrue.value = "true";

  let labelTrue = document.createElement("label");
  labelTrue.textContent = "True";

  let inputFalse = document.createElement("input");
  inputFalse.type ="radio";
  inputFalse.name ="answer";
  inputFalse.value = "false";

  let labelFalse= document.createElement("label");
  labelFalse.textContent = "False";

  let submitButton = document.createElement("button");
  submitButton.textContent ="Submit";
  submitButton.type = "submit";

  form.appendChild(labelQuestion);
  form.appendChild(inputTrue);
  form.appendChild(labelTrue);
  form.appendChild(inputFalse);
  form.appendChild(labelFalse);
  form.appendChild(submitButton);

  bookForm.appendChild(form);


  form.addEventListener("submit", function(event){
    event.preventDefault();

    let selectedValue = document.querySelector('input[name="answer"]:checked');
    if(selectedValue){
      let isRead = selectedValue.value ==="true";
      let book = new Book(inputTitle.value,inputAuthor.value,inputPages.value,isRead);
      myLibrary.push(book);
      displayBooks();
      form.reset();
    }
    else {
      alert("Please fill out form");
    }

  })
})

let book1 = new Book("Hobbit", "derek", 120, true);
let book2 = new Book("Star Wars", "Charlie", 200, false);
let lib = new addBookToLibrary();
lib.addBook(book1);
lib.addBook(book2);

console.log(myLibrary);

displayBooks();


