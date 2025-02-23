const express = require("express");

const {
  loginTeam,
  getTeam,
  updateCoins,
  unlockClue,
  getUnlockedClues,
  addTeamMember,
  getTeamMembers,
} = require("../controllers/teamController");

const router = express.Router();

router.post("/login", loginTeam);
router.post("/get-team", getTeam);
router.post("/update-coins", updateCoins);
router.post("/unlock-clue", unlockClue);
router.post("/get-clues", getUnlockedClues);
router.post("/add-member", addTeamMember);
router.post("/get-member", getTeamMembers);

module.exports = router;
