const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
let main = require("./route/books");
const mongoose = require("mongoose");

//localhost address/database name
const url = process.env.connectioString;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true,
    useUnifiedTopology: true,
    reconnectTries: 30,
    reconnectInterval: 500,
    poolSize: 10,
  })
  .then(() => {
    console.log("connect");
  })
  .catch((error) => {
    console.log(error);
  });
app.use("/images", express.static("server_images"));
app.use("/file", express.static("notes_data"));
app.use(cors());
app.use(bodyparser.json());
app.use("/", main);
app.listen(8899, function () {
  console.log("working");
});
