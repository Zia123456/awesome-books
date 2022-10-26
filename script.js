// js to access html elements
const container = document.querySelector('.books-container');
const form = document.querySelector('.add-book-container');
const bookTitle = document.querySelector('.title');
const bookAuthor = document.querySelector('.author');
const addBook = document.querySelector('.add');

// js to add book to Array of books
function addNewBook(event) {
  event.preventDefault();
  // object to contains book properties
  const book = {
    title: bookTitle.value,
    author: bookAuthor.value,
  };

  // if localStorage is empty
  if (localStorage.getItem('awesome-books') == null) {
    localStorage.setItem('awesome-books', '[]');
  }

  // geting old data and merging with new data
  const oldData = JSON.parse(localStorage.getItem('awesome-books'));
  oldData.push(book);
  // storing old data and new data to local storage
  localStorage.setItem('awesome-books', JSON.stringify(oldData));

  // eslint-disable-next-line no-restricted-globals
  location.reload();
}

form.addEventListener('click', (event) => {
  if (bookTitle !== null && bookAuthor !== null) {
    addBook.addEventListener('click', addNewBook);
  } else {
    event.preventDefault();
  }
});

// array to store books from local storage
const books = JSON.parse(localStorage.getItem('awesome-books'));

// js to remove book
function remove(index) {
  books.splice(index, 1);
  localStorage.setItem('awesome-books', JSON.stringify(books));
}

// js to read data from array of objects
function displayBooks() {
  for (let i = 0; i < books.length; i += 1) {
    const div = document.createElement('div');
    div.className = 'book';
    div.setAttribute('name', i);

    const spanTitle = document.createElement('span');
    spanTitle.className = 'book-title';
    spanTitle.innerHTML = books[i]?.title;
    div.appendChild(spanTitle);

    const breakLine = document.createElement('br');
    spanTitle.appendChild(breakLine);

    const spanAuthor = document.createElement('span');
    spanAuthor.className = 'author';
    spanAuthor.innerHTML = books[i]?.author;
    div.appendChild(spanAuthor);

    const breakLine1 = document.createElement('br');
    spanAuthor.appendChild(breakLine1);

    const removeButton = document.createElement('button');
    removeButton.className = 'remove';
    removeButton.id = i;
    removeButton.innerHTML = 'Remove';
    div.appendChild(removeButton);
    removeButton.onclick = () => {
      remove(i);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    };

    const hr = document.createElement('hr');
    div.appendChild(hr);

    container.appendChild(div);
  }
}

displayBooks();
