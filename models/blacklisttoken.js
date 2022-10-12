const { DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

const BlacklistedTokens = sequelize.define("BlacklistedTokens", {
  token: {
    type: DataTypes.STRING(512),
    unique: true,
    primaryKey: true,
  },
});

module.exports = BlacklistedTokens;
