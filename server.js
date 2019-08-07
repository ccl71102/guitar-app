
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const expressJwt = require("express-jwt");
const PORT = process.env.PORT || 7700;
require("dotenv").config();

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")));

//db connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/tabs",
{
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then( () => console.log("Fetching tabs"))
.catch( err => console.log(err));

//creates req.user
app.use("/api", expressJwt({secret: process.env.SECRET}));

app.use("/auth", require("./routes/authRouter.js"));
app.use("/api/tabs", require("./routes/tabRouter.js"));

//error handling
app.use((err, req, res, next) => {
    console.log(err);
    if(err.name === "UnauthorizedError")
        res.status(err.status);
    return res.send({errorMessage: err.message});
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//server listen
app.listen(PORT, () => console.log(`Turning up volume to ${PORT} decibels`));
