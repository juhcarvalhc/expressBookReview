const express = require('express');
let books = require('./booksdb.js');
let public_users = express.Router();
const axios = require('axios');

public_users.post("/register", (req, res) => {
});

public_users.get('/', async function (req, res) {
  try {
    const getBooks = new Promise((resolve, reject) => {
      resolve(books);
    });
    const allBooks = await getBooks;
    return res.status(200).json(allBooks);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject({ status: 404, message: "Book not found" });
    }
  })
  .then(book => res.status(200).json(book))
  .catch(err => res.status(err.status || 500).json({ message: err.message }));
});

public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  try {
    let filteredBooks = [];
    Object.keys(books).forEach((key) => {
      if (books[key].author.toLowerCase() === author.toLowerCase()) {
        filteredBooks.push({ isbn: key, ...books[key] });
      }
    });
    return res.status(200).json(filteredBooks);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by author" });
  }
});

public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;
  try {
    let filteredBooks = [];
    Object.keys(books).forEach((key) => {
      if (books[key].title.toLowerCase() === title.toLowerCase()) {
        filteredBooks.push({ isbn: key, ...books[key] });
      }
    });
    return res.status(200).json(filteredBooks);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by title" });
  }
});

public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  }
  return res.status(404).json({ message: "Book not found" });
});

module.exports.general = public_users;
