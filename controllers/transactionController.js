const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const Transaction = require("../models/transactionModel");

const createTransaction = async (req, res) => {
  const { team_name, coins_amount, game_name, operation } = req.body;

  const transaction = new Transaction({
    team_name,
    coins_amount,
    game_name,
    operation,
  });

  try {
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTransactions = async (req, res) => {
  const { team_name } = req.body;

  try {
    const transactions = await Transaction.find({ team_name });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createTransaction, getTransactions };
