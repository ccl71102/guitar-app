const express = require("express");
const Tab = require("../models/tab.js");
const tabRouter = express.Router();


tabRouter.get("/", (req, res, next) => {
    Tab.find({user: req.user._id}, (err, tabs) => {
        if(err){
            res.status(500);
            return next(err);
        }
        return res.status(200).send(tabs);
    })
});

tabRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id;
    const newTab = new Tab(req.body);
    newTab.save((err, tab) => {
        if(err){
            res.status(500);
            return next(err);
        }
        return res.status(201).send(tab);
    })
});

tabRouter.put("/:_id", (req, res, next) => {
    Tab.findOneAndUpdate(
        {_id: req.params._id},
        req.body,
        {new: true},
        (err, tab) => {
            if(err) {
                res.status(500);
                next(err);
            } else 
                res.status(201).send(tab);
        }
    );
});

tabRouter.delete("/:_id", (req, res, next) => {
    Tab.findOneAndRemove({_id: req.params._id}, (err, tab) => {
        if(err){
            res.status(500);
            next(err);
        }
        else {
            res.status(202).send({
                message: "Tab has been deleted",
                _id: tab._id
            })
        }
    });
});

module.exports = tabRouter;