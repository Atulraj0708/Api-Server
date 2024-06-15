const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const Bank = require('./bank-api/models/bank');
const Branch = require('./bank-api/models/branch');
const dotenv=require("dotenv");
const app = express();
dotenv.config();
const PORT = process.env.PORT;


app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.redirect('/banks'); 
  });

app.get('/banks', async (req, res) => {
  try {
    const banks = await Bank.findAll();
    res.json(banks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/banks/:bankId/branches', async (req, res) => {
  try {
    const { bankId } = req.params;
    const branches = await Branch.findAll({ where: { bankId } });
    if (branches.length === 0) {
        res.status(404).json({ error: 'No branches found for the specified bank ID' });
      } else {
        res.json(branches);
      }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
module.exports=app;