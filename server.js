require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const teamRouter = require("./routes/teamRouter");
const transactionRouter = require("./routes/transactionRouter");

const app = express();

// Parse JSON bodies with a larger limit
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json());

app.use(cors({ origin: "*", credentials: true }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/team", teamRouter);
app.use("/api/transaction", transactionRouter);

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });

// Vercel requires us to export the app
module.exports = app;
