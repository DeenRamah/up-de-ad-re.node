const express = require('express');
const accountRoutes = require('./routes/accountRoutes');
const accountController = require('./controllers/accountController');

const app = express();
const PORT = 3000;

accountController.loadAccounts();

app.use('/accounts', accountRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
