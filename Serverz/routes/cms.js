const express = require("express")
const router = express.Router()
// Controllers
const LodgingController = require("../controllers/CMS/lodgingController")
const TypeController = require("../controllers/CMS/typeController")
const UserController = require("../controllers/CMS/userController")
const HistoriesController = require("../controllers/CMS/historiesController")
// middleWares
const deleteLodgingAuthorization = require("../middleware/deleteLodgingAuthorization")
const mustAdmin = require("../middleware/mustAdmin")

router.get("/histories", HistoriesController.getAll)
router.get("/user-count", UserController.totalCount)

router
    .route("/lodgings")
    .get(LodgingController.getAll)
    .post(LodgingController.createNew)

router.route("/types").get(TypeController.getAll).post(TypeController.createNew)

router
    .route("/types/:id")
    .put(TypeController.editById)
    .delete(TypeController.deleteById)

router
    .route("/lodgings/:id")
    .get(LodgingController.getById)
    .delete(deleteLodgingAuthorization, LodgingController.deleteById)
    .put(deleteLodgingAuthorization, LodgingController.updateLodging)
    .patch(mustAdmin, LodgingController.updateStatus)

module.exports = { cmsRoutes: router }
