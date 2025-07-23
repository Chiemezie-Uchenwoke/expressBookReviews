import express from 'express';
import jwt from 'jsonwebtoken';
import {books} from './booksdb.js';
import env from "dotenv"

env.config();
const jwtSecret = process.env.JWT_SECRET;
const regd_users = express.Router();
let users = [];

const isValid = (username) => {
  // write code to check if the username is valid
  const isUserValid = users.find(user => user.username === username);
  return isUserValid;
};

const authenticatedUser = (username, password) => {
  
  const customer = users.find(user => user.username === username && user.password === password);

  return customer;
};

// Only registered users can login
regd_users.post("/login", (req, res) => {
  const {username, password} = req.body;

  try {
    const result = authenticatedUser(username, password);

    if (!result) return res.status(400).json({message: "please register before login"});

    if (result) {

      const user = {
        id: result.id,
        name: result.username
      }

      const token = jwt.sign(user, jwtSecret, {expiresIn: "15m"});
      req.session.accessToken = token;

      return res.status(200).json({message: "Successful login!"});
    }
    
    else {
      return res.status(400).json({message: "Wrong password! Try again"});
    }

  } catch(err) {
    console.log(err);
    return res.status(500).json({message: "Internal server error"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const {isbn} = req.params;
  const {review} = req.body;

  const book = books[isbn];

  if (!book) return res.status(404).json({message: "Book not found"});

  try {
    console.log(req.user);
    const username = req.user.name;

    /*
      Add a review with the user's name: EX - 

      book.reviews = {
        chiemezie: "A truly inspiring read!"
      };

    */
    book.reviews[username] = review;

    return res.status(200).json({ message: "Review added!", book });
  } catch (err){
    console.log(err);
    return res.status(500).json({message: "Internal server error"});
  }
});

// delete a review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const {isbn} = req.params;

  try {
    const book = books[isbn];
    const username = req.user.username;

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    delete book.reviews[username];

    return res.status(200).json({message: "Book review deleted successfully!"});
  } catch (err){
    console.log(err);
    return res.status(500).json({message: "Internal server error"});
  }

});

// Export as named exports
export { regd_users as authenticated, isValid, users };
