"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Type extends Model {
        static associate(models) {
            this.hasMany(models.Lodging, {foreignKey: 'typeId'})
        }
    }
    Type.init(
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
        },
        {
            sequelize,
            modelName: "Type",
        }
    )
    return Type
}
