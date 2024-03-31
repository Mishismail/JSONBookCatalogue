document.addEventListener('DOMContentLoaded', function() {
    const bookForm = document.getElementById('bookForm');
    const bookList = document.getElementById('bookList');
  
    // Load existing books from session storage
    const books = JSON.parse(sessionStorage.getItem('books')) || [];
  
    // Display existing books
    displayBooks();
  
    // Handle form submission
    bookForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Get form values
      const authorInput = document.getElementById('author');
      const titleInput = document.getElementById('title');
      const genreInput = document.getElementById('genre');
      const reviewsInput = document.getElementById('reviews');
  
      const author = authorInput.value;
      const title = titleInput.value;
      const genre = genreInput.value;
      const reviews = reviewsInput.value;
  
      // Create book object
      const book = {
        author: author,
        title: title,
        genre: genre,
        reviews: reviews
      };
  
      // Add book to the list
      books.push(book);
  
      // Save updated books to session storage
      sessionStorage.setItem('books', JSON.stringify(books));
  
      // Clear form inputs
      authorInput.value = '';
      titleInput.value = '';
      genreInput.value = '';
      reviewsInput.value = '';
  
      // Display updated books
      displayBooks();
    });
  
    // Display all books in the catalog
    function displayBooks() {
      bookList.innerHTML = '';
  
      books.forEach(function(book, index) {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
  
        const bookInfo = `
          <h3>${book.title}</h3>
          <p><strong>Author:</strong> ${book.author}</p>
          <p><strong>Genre:</strong> ${book.genre}</p>
          <p><strong>Reviews:</strong> ${book.reviews}</p>
          <button class="edit-button" data-index="${index}">Edit</button>
          <button class="remove-button" data-index="${index}">Remove</button>
        `;
  
        bookItem.innerHTML = bookInfo;
  
        bookList.appendChild(bookItem);
      });
  
      // Attach event listeners to edit and remove buttons
      const editButtons = document.getElementsByClassName('edit-button');
      const removeButtons = document.getElementsByClassName('remove-button');
  
      for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener('click', editBook);
        removeButtons[i].addEventListener('click', removeBook);
      }
    }
  
    // Handle book edit
    function editBook() {
      const index = this.getAttribute('data-index');
      const book = books[index];
  
      const authorInput = document.getElementById('author');
      const titleInput = document.getElementById('title');
      const genreInput = document.getElementById('genre');
      const reviewsInput = document.getElementById('reviews');
  
      authorInput.value = book.author;
      titleInput.value = book.title;
      genreInput.value = book.genre;
      reviewsInput.value = book.reviews;
  
      // Remove the book from the list
      books.splice(index, 1);
  
      // Save updated books to session storage
      sessionStorage.setItem('books', JSON.stringify(books));
  
      // Display updated books
      displayBooks();
    }
  
    // Handle book removal
    function removeBook() {
      const index = this.getAttribute('data-index');
  
      // Remove the book from the list
      books.splice(index, 1);
  
      // Save updated books to session storage
      sessionStorage.setItem('books', JSON.stringify(books));
  
      // Display updated books
      displayBooks();
    }
  });
  