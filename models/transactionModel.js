const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  team_name: {
    type: String,
    require: true,
  },
  coins_amount: {
    type: String,
    require: true,
  },
  game_name: {
    type: String,
    require: true,
  },
  operation: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
