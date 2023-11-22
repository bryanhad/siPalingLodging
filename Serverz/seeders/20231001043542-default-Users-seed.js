"use strict"

const { hashPassword } = require('../lib/bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const users = require('../data/users.json')

        const usersSeed = users.map(({password, ...user}) => {
            const hashedPassword = hashPassword(password)
            return {
                ...user,
                password: hashedPassword,
                profilePicture: `https://source.boringavatars.com/beam/40/${user.username}`,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        })

        await queryInterface.bulkInsert("Users", usersSeed)
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Users", null, {})
    },
}
