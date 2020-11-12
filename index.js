const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

//Connecting to mongodb.
mongoose
  .connect("mongodb://localhost:27017/shopApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo Connection Open");
  })
  .catch((err) => {
    console.log("Mongo Connection Error");
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/dog", (req, res) => {
  res.send("Woof!");
});

app.listen(8080, () => {
  console.log("App is listening at port 8080");
});
