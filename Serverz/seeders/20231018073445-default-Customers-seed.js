"use strict"

const { hashPassword } = require("../lib/bcrypt")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const customers = require("../data/customers.json")

        const customersSeed = customers.map(({ password, ...customer }) => {
            const hashedPassword = hashPassword(password)
            return {
                ...customer,
                password: hashedPassword,
                profilePicture: `https://source.boringavatars.com/beam/40/${customer.username}`,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        })

        await queryInterface.bulkInsert("Customers", customersSeed)
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Customers", null, {})
    },
}
