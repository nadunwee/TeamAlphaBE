const express = require("express");

const { loginTeam, getTeam } = require("../controllers/teamController");

const router = express.Router();

router.post("/login", loginTeam);
router.post("/get-team", getTeam);

module.exports = router;
