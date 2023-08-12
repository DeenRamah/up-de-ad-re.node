const fs = require('fs');
const currencies = require('../currencies.json');
const Account = require('../models/accountModel');

let accounts = [];

function loadAccounts() {
  // Load accounts from a file or a database (not shown in this example).
  // For simplicity, we'll initialize one account.
  accounts.push(new Account('1', 1000, 'USD'));
}

function saveAccounts() {
  // Save accounts to a file or a database (not shown in this example).
}

function getAccountById(id) {
  return accounts.find(account => account.id === id);
}

function updateAccountBalance(id, newBalance) {
  const account = getAccountById(id);
  if (account) {
    account.balance = newBalance;
    saveAccounts();
    return true;
  }
  return false;
}

function convertCurrency(amount, fromCurrency, toCurrency) {
  return (amount / currencies[fromCurrency]) * currencies[toCurrency];
}

module.exports = {
  loadAccounts,
  getAccountById,
  updateAccountBalance,
  convertCurrency
};
