const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const routes = require("./routes")
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
require("dotenv").config()
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use("/", routes)

app.use(cookieParser());

const mongoDBUrl = process.env.MONGOURL;
mongoose.connect(mongoDBUrl)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));

app.listen(PORT, () => console.log("server started at ", PORT));