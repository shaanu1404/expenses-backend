const { DataTypes } = require('sequelize')
const sequelize = require('../dbconfig')

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.TEXT,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true,
})

User.afterCreate('CREATE_USER_PROFILE', async (user, options) => {
    await user.createProfile({})
})

module.exports = User