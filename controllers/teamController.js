const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const Team = require("../models/teamModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET);
};

const loginTeam = async (req, res) => {
  const { team_name, password } = req.body;

  const team = await Team.findOne({ team_name: team_name });

  try {
    const team = await Team.login(team_name, password);
    console.log(team);

    const name = team.team_name;
    const coins = team.coins;
    const id = team._id;
    const token = createToken(team_name._id);

    res.status(200).json({ name, token, coins, id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTeam = async (req, res) => {
  const { id } = req.body;

  try {
    const team = await Team.find({ _id: id });
    res.status(200).json(team[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCoins = async (req, res) => {
  const { team_name, coins } = req.body;

  console.log(team_name, coins);

  try {
    if (!team_name || coins === undefined) {
      throw new Error("Team ID and new coin value are required");
    }

    const team = await Team.findOne({ team_name });
    if (!team) {
      throw new Error("Team not found");
    }

    // Convert existing and new coins to integers and add them
    const currentCoins = parseInt(team.coins) || 0;
    const newCoins = parseInt(coins);
    const updatedCoins = currentCoins + newCoins;

    // Update and save
    team.coins = updatedCoins.toString(); // Convert back to string if needed
    await team.save();

    res
      .status(200)
      .json({ message: "Coins updated successfully", coins: team.coins });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginTeam, getTeam, updateCoins };
