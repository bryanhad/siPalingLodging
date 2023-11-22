"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const types = require('../data/types.json')

        const typesSeed = types.map(type => {
            return {
                name: type.name,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        })

        await queryInterface.bulkInsert("Types", typesSeed)
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Types", null, {})
    },
}
