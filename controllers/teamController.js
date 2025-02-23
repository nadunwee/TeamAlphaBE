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
  const { team_name, coins, operation } = req.body;

  try {
    if (!team_name || coins === undefined || !operation) {
      throw new Error("Team ID and new coin value are required");
    }

    const team = await Team.findOne({ team_name });
    if (!team) {
      throw new Error("Team not found");
    }

    // Convert existing and new coins to integers and add them
    let updatedCoins;
    const currentCoins = parseInt(team.coins) || 0;
    const newCoins = parseInt(coins);

    if (operation == "credit") {
      updatedCoins = currentCoins + newCoins;
    } else {
      updatedCoins = currentCoins - newCoins;
    }

    if (updatedCoins < 0) {
      updatedCoins = 0;
    }
    // Update and save
    team.coins = updatedCoins.toString(); // Convert back to string if needed
    await team.save();

    res.status(200).json({
      message: "Coins updated successfully",
      coins: team.coins,
      operation,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const unlockClue = async (req, res) => {
  const { team_name, clue_name, coins_spent } = req.body;

  try {
    // Find the team by team_name
    const team = await Team.findOne({ team_name });
    if (!team) {
      return res.status(400).json({ error: "Team not found" });
    }

    // Check if the team has enough coins to unlock the clue
    if (team.coins < coins_spent) {
      return res
        .status(400)
        .json({ error: "Not enough coins to unlock this clue" });
    }

    // Deduct the coins from the team's account
    team.coins -= coins_spent;

    // Add the unlocked clue to the team's unlocked_clues array
    team.unlocked_clues.push({ clue_name, coins_spent });

    // Save the updated team data
    await team.save();

    // Send a success response
    res.status(200).json({ message: "Clue unlocked successfully", team });
  } catch (error) {
    res.status(500).json({ error: "Failed to unlock clue" });
  }
};

const getUnlockedClues = async (req, res) => {
  const { team_name } = req.body; // Get team name from request params

  try {
    // Find the team by team_name
    const team = await Team.findOne({ team_name });

    if (!team) {
      return res.status(400).json({ error: "Team not found" });
    }

    // Return the list of unlocked clues
    res.status(200).json({ unlocked_clues: team.unlocked_clues });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch unlocked clues" });
  }
};

const addTeamMember = async (req, res) => {
  const { team_name, name, position } = req.body;

  try {
    if (!team_name || !name || !position) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find the team by team_name
    const team = await Team.findOne({ team_name });

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    // Add the new member
    team.team_members.push({ name, position });

    // Save the updated team document
    await team.save();

    res.status(200).json({ message: "Team member added successfully", team });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTeamMembers = async (req, res) => {
  const { team_name } = req.body;

  try {
    // Fetch the team based on a query (modify if needed)
    const team = await Team.findOne({ team_name: team_name });

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    // Send only the team members
    res.status(200).json({ team_members: team.team_members });
  } catch (error) {
    console.error("Error fetching team members:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  loginTeam,
  getTeam,
  updateCoins,
  unlockClue,
  getUnlockedClues,
  addTeamMember,
  getTeamMembers,
};
