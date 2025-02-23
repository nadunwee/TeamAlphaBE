const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const teamSchema = new Schema({
  team_name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  coins: {
    type: String,
    require: true,
  },
  unlocked_clues: [
    {
      clue_name: {
        type: String, // The name of the clue
        required: true,
      },
      coins_spent: {
        type: Number, // The number of coins spent to unlock the clue
        required: true,
      },
    },
  ],
  team_members: [
    {
      name: {
        type: String,
        required: true,
      },
      position: {
        type: String,
        required: true,
      },
    },
  ],
});

// static login method
teamSchema.statics.login = async function (team_name, password) {
  if (!team_name || !password) {
    throw Error("All fields must be filled");
  }

  const team = await this.findOne({ team_name });

  if (!team) {
    throw Error("Incorrect team name");
  }

  if (team.password !== password) {
    throw Error("Incorrect password");
  }

  return team;
};

module.exports = mongoose.model("Team", teamSchema);
