const fs = require('fs');
const csv = require('csv-parser');
const sequelize = require('./database');
const Bank = require('./bank-api/models/bank');
const Branch = require('./bank-api/models/branch');


async function loadCSVData() {
  try {
    await sequelize.sync({ force: true });

    const banks = new Map();
    const dataPromises = [];

    fs.createReadStream('bank-api/data/bank_branches.csv')
      .pipe(csv())
      .on('data', (row) => {
        const {
          ifsc, bank_id, branch, address,
          city, district, state, bank_name
        } = row;

        dataPromises.push((async () => {
          let bank = banks.get(bank_name);
          if (!bank) {
            bank = await Bank.findOne({ where: { name: bank_name } });
            if (!bank) {
              bank = await Bank.create({ name: bank_name });
            }
            banks.set(bank_name, bank);
          }

          await Branch.create({
            ifsc,
            name: branch,
            address,
            city,
            district,
            state,
            bankId: bank.id
          });
        })());
      })
      .on('end', async () => {
        try {
          await Promise.all(dataPromises);
          console.log('CSV file successfully processed and data loaded.');
        } catch (error) {
          console.error('Error processing data:', error);
        } finally {
          await sequelize.close();
        }
      });
  } catch (error) {
    console.error('Error loading CSV data:', error);
    await sequelize.close();
  }
}

loadCSVData();
