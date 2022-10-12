const { DataTypes } = require('sequelize')
const sequelize = require('../dbconfig')
const User = require('./user')
const Account = require('./account')

const Expense = sequelize.define('Expense', {
    type: {
        type: DataTypes.ENUM(['CREDIT', 'DEBIT']),
        defaultValue: 'DEBIT'
    },
    amount: {
        type: DataTypes.FLOAT(10, 2),
    },
}, {
    timestamps: true
})

User.hasMany(Expense, {as: 'expenses'})
Expense.belongsTo(User, {foreignKey: 'UserId', as: 'user', onDelete: 'CASCADE'})
Account.hasMany(Expense, {as: 'expenses'})
Expense.belongsTo(Account, {foreignKey: 'AccountId', as: 'account', onDelete: 'CASCADE'})

module.exports = Expense