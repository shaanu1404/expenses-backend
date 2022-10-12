const { DataTypes } = require('sequelize')
const sequelize = require('../dbconfig')
const User = require('./user')

const UserProfile = sequelize.define("UserProfile", {
    profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    coverImage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: true,
        }
    }
}, {
    timestamps: true
})

User.hasOne(UserProfile, {
    onDelete: 'CASCADE',
    as: 'profile'
})
UserProfile.belongsTo(User)

module.exports = UserProfile