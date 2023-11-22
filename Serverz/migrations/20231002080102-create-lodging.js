"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Lodgings", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            facility: {
                type: Sequelize.STRING,
            },
            roomCapacity: {
                type: Sequelize.INTEGER,
            },
            imgUrl: {
                type: Sequelize.STRING,
            },
            authorId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            location: {
                type: Sequelize.STRING,
            },
            price: {
                type: Sequelize.INTEGER,
            },
            status: {
                type: Sequelize.STRING,
            },
            typeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Types",
                    key: "id",
                },
                onDelete: "SET NULL",
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Lodgings")
    },
}
