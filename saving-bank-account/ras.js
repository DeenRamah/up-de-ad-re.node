const express = require('express');
const bodyParser = require('body-parser');
const accountController = require('../controllers/accountController');

const router = express.Router();
router.use(bodyParser.json());

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const account = accountController.getAccountById(id);
  if (account) {
    res.json(account);
  } else {
    res.status(404).json({ error: 'Account not found' });
  }
});

router.post('/:id/deposit', (req, res) => {
  const { id } = req.params;
  const { amount, currency } = req.body;
  const account = accountController.getAccountById(id);

  if (!account) {
    res.status(404).json({ error: 'Account not found' });
    return;
  }

  const convertedAmount = accountController.convertCurrency(amount, currency, account.currency);
  const newBalance = account.balance + convertedAmount;
  if (accountController.updateAccountBalance(id, newBalance)) {
    res.json({ message: 'Deposit successful' });
  } else {
    res.status(500).json({ error: 'Failed to update account balance' });
  }
});

// Similar routes can be implemented for withdrawal, transfer, etc.

module.exports = router;
