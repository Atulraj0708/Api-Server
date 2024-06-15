const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const Bank = sequelize.define('Bank', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Bank;
