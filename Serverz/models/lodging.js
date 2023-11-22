"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Lodging extends Model {
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: "authorId" })
            this.belongsTo(models.Type, { foreignKey: "typeId" })
            this.hasMany(models.Wishlist, { foreignKey: 'LodgingId' })
        }
    }
    Lodging.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Please fill in name input",
                    },
                    notEmpty: {
                        msg: "Please fill in name input",
                    },
                },
            },
            facility: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Please fill in facility input",
                    },
                    notEmpty: {
                        msg: "Please fill in facility input",
                    },
                },
            },
            roomCapacity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Please fill in room capacity input",
                    },
                    notEmpty: {
                        msg: "Please fill in room capacity input",
                    },
                },
            },
            imgUrl: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Please fill in image URL input",
                    },
                    notEmpty: {
                        msg: "Please fill in image URL input",
                    },
                    isUrl: {
                        msg: "Image URL input has to be a correct url",
                    },
                },
            },
            authorId: DataTypes.INTEGER,
            location: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Please fill in location input",
                    },
                    notEmpty: {
                        msg: "Please fill in location input",
                    },
                },
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Please fill in price input",
                    },
                    notEmpty: {
                        msg: "Please fill in price input",
                    },
                    min: {
                        args: 500_000,
                        msg: "Minimum price is Rp 500.000,00!",
                    },
                },
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: "active",
                validate: {
                    isValid(value) {
                        switch(value) {
                            case 'active':
                            case 'inactive':    
                            case 'archived': return
                            default: throw new Error('Lodging status can only be "active" / "inactive" / "archived"')
                        }
                    }
                }
            },
            typeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Please fill in typeId input",
                    },
                    notEmpty: {
                        msg: "Please fill in typeId input",
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "Lodging",
        }
    )
    return Lodging
}
