// js to access html elements
// eslint-disable-next-line max-classes-per-file
const container = document.querySelector('.books-container');
const form = document.querySelector('.add-book-container');
const bookTitle = document.querySelector('.title');
const bookAuthor = document.querySelector('.author');
const addBook = document.querySelector('.add');
// Class book, to define a book

// eslint-disable-next-line max-classes-per-file
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// creating book object from class Book
class features {
  static addNewBook() {
    // js to create a new book object
    const newBookTitle = bookTitle.value;
    const newBookAuthor = bookAuthor.value;
    const book = new Book(newBookTitle, newBookAuthor);

    // to set up and update local storage
    if (localStorage.getItem('awesome-books') == null) {
      localStorage.setItem('awesome-books', '[]');
    }

    // geting old data and merging with new data
    const oldData = JSON.parse(localStorage.getItem('awesome-books'));
    oldData.push(book);

    // updating local storage data
    localStorage.setItem('awesome-books', JSON.stringify(oldData));
  }

  static removeBook(index) {
    const books = JSON.parse(localStorage.getItem('awesome-books'));
    books.splice(index, 1);
    // js to update local storage after removing a book
    localStorage.setItem('awesome-books', JSON.stringify(books));
  }

  static displayBooks() {
    container.innerHTML = '';
    const books = JSON.parse(localStorage.getItem('awesome-books'));
    for (let i = 0; i < books.length; i += 1) {
      const div = document.createElement('div');
      div.className = 'book-container';
      if (i % 2 !== 0) {
        div.className = 'white-color';
      } else {
        div.className = 'gray-color';
      }

      const textDiv = document.createElement('div');
      textDiv.className = 'text-container';

      const spanTitle = document.createElement('span');
      spanTitle.className = 'book-title';
      spanTitle.innerHTML = `"${books[i]?.title}"`;
      textDiv.appendChild(spanTitle);

      const by = document.createElement('span');
      by.innerHTML = ' by ';
      textDiv.appendChild(by);

      const spanAuthor = document.createElement('span');
      spanAuthor.className = 'author';
      spanAuthor.innerHTML = books[i]?.author;
      textDiv.appendChild(spanAuthor);

      const removeButton = document.createElement('button');
      removeButton.className = 'remove';
      removeButton.innerHTML = 'Remove';
      div.appendChild(removeButton);
      // eslint-disable-next-line no-loop-func
      removeButton.onclick = () => {
        features.removeBook(i);
        // eslint-disable-next-line no-restricted-globals
        features.displayBooks();
      };

      div.appendChild(textDiv);
      container.appendChild(div);
    }
  }
}

// js to add event to aadBook and prevent default
form.addEventListener('click', (event) => {
  if (bookTitle.value == null || bookAuthor.value == null) {
    event.preventDefault();
  } else {
    addBook.addEventListener('click', features.addNewBook);
  }
});

// js to invoke displayBooks function
window.addEventListener('DOMContentLoaded', features.displayBooks);

// js to make web page single page application
// js to access html elements
const bookContainer = document.querySelector('.books-container');
const contactContainer = document.querySelector('.contact-container');
const list = document.querySelector('.list-text');
const addNew = document.querySelector('.add-new-text');
const contact = document.querySelector('.contact-text');
const pageTitle = document.querySelector('.awesome-books-text');

// functions
function displayList() {
  bookContainer.classList.remove('hide');
  list.classList.remove('deactive');
  bookContainer.classList.add('books-container');
  form.classList.add('hide');
  addNew.classList.add('deactive');
  contactContainer.classList.add('hide');
  contact.classList.add('deactive');
  pageTitle.innerHTML = 'All awesome books';
}
list.addEventListener('click', displayList);

function displayAddNew() {
  bookContainer.classList.add('hide');
  list.classList.add('deactive');
  form.classList.remove('hide');
  addNew.classList.remove('deactive');
  contactContainer.classList.add('hide');
  contact.classList.add('deactive');
  pageTitle.innerHTML = 'Add a new book';
}

addNew.addEventListener('click', displayAddNew);

function displayContact() {
  bookContainer.classList.add('hide');
  list.classList.add('deactive');
  form.classList.add('hide');
  addNew.classList.add('deactive');
  contactContainer.classList.remove('hide');
  contact.classList.remove('deactive');
  pageTitle.innerHTML = 'Contact information';
}

contact.addEventListener('click', displayContact);
