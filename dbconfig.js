const { Sequelize } = require('sequelize')
const { DATABASE_DIALECT, DATABASE_HOST, DATABASE_PORT, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD } = process.env

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
    dialect: DATABASE_DIALECT,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
})

module.exports = sequelize