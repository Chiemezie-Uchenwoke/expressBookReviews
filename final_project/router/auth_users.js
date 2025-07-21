import express from 'express';
import jwt from 'jsonwebtoken';
import books from './booksdb.js';

const regd_users = express.Router();
let users = [];

const isValid = (username) => {
  // write code to check if the username is valid
};

const authenticatedUser = (username, password) => {
  // write code to check if username and password match the one we have in records
};

// Only registered users can login
regd_users.post("/login", (req, res) => {
  // Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  // Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Export as named exports
export { regd_users as authenticated, isValid, users };
