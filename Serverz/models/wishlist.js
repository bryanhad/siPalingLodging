"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Wishlist extends Model {
        static associate(models) {
            this.belongsTo(models.Customer, { foreignKey: 'CustomerId' })
            this.belongsTo(models.Lodging, { foreignKey: 'LodgingId' })
        }
    }
    Wishlist.init(
        {
            CustomerId: DataTypes.INTEGER,
            LodgingId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Wishlist",
        }
    )
    return Wishlist
}
