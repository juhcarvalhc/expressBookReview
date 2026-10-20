const express = require('express');
let books = require('./booksdb.js');
let public_users = express.Router();

public_users.get('/', function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});

public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
});

public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  let filteredBooks = [];
  Object.keys(books).forEach((key) => {
    if (books[key].author.toLowerCase() === author.toLowerCase()) {
      filteredBooks.push(books[key]);
    }
  });
  res.send(JSON.stringify(filteredBooks, null, 4));
});

public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  let filteredBooks = [];
  Object.keys(books).forEach((key) => {
    if (books[key].title.toLowerCase() === title.toLowerCase()) {
      filteredBooks.push(books[key]);
    }
  });
  res.send(JSON.stringify(filteredBooks, null, 4));
});

module.exports.general = public_users;
