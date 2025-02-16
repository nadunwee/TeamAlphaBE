const express = require("express");

const {
  createTransaction,
  getTransactions,
} = require("../controllers/transactionController");

const router = express.Router();

router.post("/create-transaction", createTransaction);
router.post("/get-transactions", getTransactions);

module.exports = router;
