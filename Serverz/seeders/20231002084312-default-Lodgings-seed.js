"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const lodgings = require('../data/lodgings.json')

        const lodgingsSeed = lodgings.map(lodging => {
            return {
                ...lodging,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        })

        await queryInterface.bulkInsert("Lodgings", lodgingsSeed)
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Lodgings", null, {})
    },
}
