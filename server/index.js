const express = require("express");
const app = express();
const morgan = require("morgan");
const body_parser = require("body-parser");
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config/config");

// db setup
mongoose
  .connect(config.mongoURI)
  .then(conn => {
    console.log("Connected to MongoLab");
  })
  .catch(err => {
    console.log(err.message);
  });

// app setup
app.use(morgan("combined"));
app.use(body_parser.json({ type: "*/*" }));
app.use(cors());
// routes
router(app);

// listen
app.listen(3030, () => {
  console.log("Running on http://localhost:3030");
});
