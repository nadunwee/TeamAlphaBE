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

//Access to fetch at 'http://localhost:4000/api/register' from origin 'http://localhost:5173' has been blocked by CORS policy
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/team", teamRouter);
app.use("/api/transaction", transactionRouter);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
      console.log("connected to DB & listning on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
