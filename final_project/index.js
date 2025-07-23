import express from "express";
import jwt  from 'jsonwebtoken';
import session from 'express-session';
import { authenticated as customer_routes } from "./router/auth_users.js";
import {general as genl_routes} from "./router/general.js";
import env from "dotenv";

env.config();
const app = express();
const jwtSecret = process.env.JWT_SECRET;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/customer", session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    
    const token = req.session.accessToken;

    if (!token){
        return res.status(401).json({message: "Access denied! No token provided."})
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();

    } catch (err) {
        console.log(err);
        return res.status(403).json({message: "Invalid or expired token"});
    }

});
 
const PORT = process.env.PORT || 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
