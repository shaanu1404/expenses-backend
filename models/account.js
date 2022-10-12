const { DataTypes } = require('sequelize')
const sequelize = require('../dbconfig')
const User = require('./user')

const Account = sequelize.define('Account', {
    name: {
        type: DataTypes.STRING(255),
        unique: true
    },
    accountNumber: {
        type: DataTypes.STRING(16),
        unique: true,
        allowNull: true
    },
}, {
    timestamps: true,
})

User.hasMany(Account, {as: 'accounts'})
Account.belongsTo(User, {
    foreignKey: 'UserId',
    as: 'user',
})

module.exports = Account