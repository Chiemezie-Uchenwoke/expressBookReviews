import express from 'express';
import books from './booksdb.js';
import { isValid, users } from './auth_users.js';

const public_users = express.Router();

public_users.post("/register", (req, res) => {
  // Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get('/', (req, res) => {
  // Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res) => {
  // Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get book details based on author
public_users.get('/author/:author', (req, res) => {
  // Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get all books based on title
public_users.get('/title/:title', (req, res) => {
  // Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get book review
public_users.get('/review/:isbn', (req, res) => {
  // Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

export { public_users as general };
