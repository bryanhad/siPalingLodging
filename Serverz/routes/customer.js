const express = require("express")
const router = express.Router()
// Controllers 
const LodgingController = require("../controllers/CMS/lodgingController")
const custController = require("../controllers/customers/custController")

router.route('/wishlists')
    .get(custController.getAllWishList)
    .post(custController.addWishlist)

router.get('/user', custController.getCustomerDetail)

module.exports = {customerRoutes: router}