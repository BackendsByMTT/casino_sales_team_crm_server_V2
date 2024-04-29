const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io")
const routes = require("./src/routes")

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
require("dotenv").config()
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

app.use("/", routes)


const mongoDBUrl = process.env.MONGOURL;
mongoose.connect(mongoDBUrl)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));

app.listen(PORT, () => console.log("server started at ", PORT));