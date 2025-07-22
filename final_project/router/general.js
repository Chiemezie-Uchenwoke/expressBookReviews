import express from 'express';
import {books} from './booksdb.js';
import { isValid, users } from './auth_users.js';

const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(400).json({message: "Please provide username and password"});
  }

  // check if user exist
  const userExist = isValid(username);
  console.log(userExist);

  if (!userExist) {
    const newUser = {id: (users.length + 1), username, password};
    users.push(newUser);

    console.log(users);

    return res.status(201).json({
      message: "New user created!",
      newUser
    });
  } else {
    return res.status(200).json({message: "User already exist"});
  }

});

// Get the book list available in the shop
public_users.get('/', (req, res) => {

  const bookList = Object.values(books);
  return res.status(300).json(bookList);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res) => {
  const {isbn} = req.params;

  const book = books[isbn];

  return res.status(300).json(book);
});

// Get book details based on author
public_users.get('/author/:author', (req, res) => {
  const {author} = req.params;
  const bookList = Object.values(books);
  console.log(bookList);

  const book = bookList.filter(b => b.author === author);
  
  if (book.length > 0) return  res.status(200).json(book);

  else return res.status(404).json({message: "Book not found"});
 
});

// Get all books based on title
public_users.get('/title/:title', (req, res) => {
  const {title} = req.params;
  const bookList = Object.values(books);

  const book = bookList.filter(b => b.title === title);
  
  if (book.length > 0) return res.status(200).json(book);
  else return res.status(404).json({message: "Book not found"});
});

// Get book review
public_users.get('/review/:isbn', (req, res) => {
  const {isbn} = req.params;
  const book = books[isbn];

  if (!book) return res.status(404).json({message: "Book not found"});

  const bookReview = book.reviews;
  
  if (Object.keys(bookReview).length === 0) return res.status(200).json({message: "No reviews for the book"});

  else return res.status(200).json(bookReview);
});

export { public_users as general };
