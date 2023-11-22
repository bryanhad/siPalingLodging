const express = require("express")
const router = express.Router()
const mustLogIn = require("../middleware/mustLogIn")
const { cmsRoutes } = require("./cms")
const UserController = require("../controllers/CMS/userController")
const custController = require("../controllers/customers/custController")
const { customerRoutes } = require("./customer")
const LodgingController = require("../controllers/CMS/lodgingController")
const TypeController = require("../controllers/CMS/typeController")

router.get("/", (req, res) =>
    res.status(200).json({ message: "Masuk pak ekooooo hehe" })
)

// CMS LOGIN & REGISTER
router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.post("/auth/google-sign-in", UserController.GoogleLogin)

// Customer LOGIN & REGISTER
router.post("/pub/register", custController.register)
router.post("/pub/login", custController.login)
router.post("/pub/auth/google-sign-in", custController.GoogleLogin)

router.get(
    "/pub/lodgings",
    LodgingController.getAll_Pagination_FilterByLocation
)
router.get("/pub/lodgings/:id", LodgingController.getById)
router.get("/pub/types", TypeController.getAll)
router.get('/pub/lodgings/:id/qrCode', LodgingController.get_QRCode)

router.use(mustLogIn)

router.use(cmsRoutes)
router.use("/pub", customerRoutes)

module.exports = { routes: router }
