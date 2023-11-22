"use strict"
const { Model } = require("sequelize")
const { hashPassword } = require("../lib/bcrypt")
module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        static associate(models) {
            this.hasMany(models.Wishlist, { foreignKey: 'CustomerId' })
        }
    }
    Customer.init(
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
                    min: {
                        args: 5,
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
            profilePicture: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Customer",
        }
    )
    Customer.beforeCreate((customer) => {
        const hashedPassword = hashPassword(customer.password)
        customer.password = hashedPassword
        customer.profilePicture = `https://source.boringavatars.com/beam/40/${customer.username}`
    })
    return Customer
}
