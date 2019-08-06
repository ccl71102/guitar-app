const express = require("express");
const User = require("../models/user");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

//sign up

authRouter.post("/signup", (req, res, next) => {

    //check if user already exists
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        if (user) {
            res.status(400);
            return next(new Error("Username already exists."));
        }

        //if the user was not found, create user

        const newUser = new User(req.body);
        newUser.save((err, savedUser) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            
            //create token
            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET);
            
            //return user and token
            return res.status(201).send({user: savedUser.withoutPassword(), token});
        });
    });
});

//login

authRouter.post("/login", (req, res, next) => {
        //check if user exists
        User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if (err) {
            res.status(500);
            return next(err);
        }

        if (!user) {
           res.status(401);
           return next(new Error("Username or password are incorrect"));
        }

        //check if the passwords match

        user.checkPassword(req.body.password, (err, isMatch) => {
            if(err) {
                res.status(401);
                return next(err);
            }

            if(!isMatch) {
                res.status(401);
                return next(new Error("Username or password are incorrect"));
            }
        })

        //create token

        const token = jwt.sign(user.withoutPassword(), process.env.SECRET);

        //send user object and token
        return res.status(200).send({token, user: user.withoutPassword()});
    });
});

module.exports = authRouter;