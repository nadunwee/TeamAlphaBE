const express = require("express");

const {
  loginTeam,
  getTeam,
  updateCoins,
} = require("../controllers/teamController");

const router = express.Router();

router.post("/login", loginTeam);
router.post("/get-team", getTeam);
router.post("/update-coins", updateCoins);

module.exports = router;
