"use strict"
const { Model } = require("sequelize")
const bcrypt = require('bcryptjs');
const { hashPassword } = require("../lib/bcrypt");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            this.hasMany(models.Lodging, {foreignKey: 'authorId'})
        }
        get username() {
            return this.username
        }
    }
    User.init(
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Please fill in username input",
                    },
                    notEmpty: {
                        msg: "Please fill in username input",
                    },
                    len: {
                        args: [5],
                        msg: "Minimum username length is 5 characters!",
                    },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: { //for custom must unique error message
                    msg: 'Email has already been taken!'
                },
                validate: {
                    notNull: {
                        msg: "Please fill in email input",
                    },
                    notEmpty: {
                        msg: "Please fill in email input",
                    },
                    isEmail: {
                        msg: "Please fill in with a correct email format",
                    }
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Please fill in password input",
                    },
                    notEmpty: {
                        msg: "Please fill in password input",
                    },
                    len: {
                        args: [5],
                        msg: "Minimum password length is 5 characters!",
                    },
                },
            },
            profilePicture: {
                type: DataTypes.STRING,
            },
            role: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            address: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
        },
    )
    User.beforeCreate((user) => {
        const hashedPassword = hashPassword(user.password)
        user.password = hashedPassword
        user.role = 'admin'
        user.profilePicture = `https://source.boringavatars.com/beam/40/${user.username}`
    })
    return User
}
