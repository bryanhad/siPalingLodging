"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const wishlists = require("../data/wishlist.json")

        const wishlistsSeed = wishlists.map((wishlist) => {
            return {
                ...wishlist,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        })

        await queryInterface.bulkInsert("Wishlists", wishlistsSeed)
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Wishlists", null, {})
    },
}
