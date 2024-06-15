const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Bank = require('./bank');

const Branch = sequelize.define('Branch', {
  ifsc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bankId: {
    type: DataTypes.INTEGER,
    references: {
      model: Bank,
      key: 'id'
    }
  }
});

Branch.belongsTo(Bank, { foreignKey: 'bankId' });

module.exports = Branch;
