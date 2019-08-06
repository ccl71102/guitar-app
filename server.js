
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const app = express();
const expressJwt = require("express-jwt");
const PORT = process.env.PORT || 7700;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/guitardb",
{
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then( () => console.log("Plugging guitar to amp"))
.catch( err => console.log(err));

//creates req.user
app.use("/api", expressJwt({secret: process.env.SECRET}));
app.use("/auth", require("./routes/authRouter.js"));
app.use("/tabs", require("./routes/tabRouter.js"));

app.use((err, req, res, next) => {
    console.log(err);
    if(err.name === "UnauthorizedError")
        res.status(err.status);
    return res.send({errorMessage: err.message});
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Turning up volume to ${PORT} decibels`));
