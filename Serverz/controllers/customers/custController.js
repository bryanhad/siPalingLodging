const { validatePassword } = require("../../lib/bcrypt")
const { generateToken } = require("../../lib/jwt")
const { Customer, Wishlist, Lodging, User, Type } = require("../../models")
const { OAuth2Client } = require("google-auth-library")
const client = new OAuth2Client()

module.exports = class custController {
    static async register(req, res, next) {
        try {
            const newCustomer = await Customer.create(req.body)
            const jwtToken = generateToken({ id: newCustomer.id })
            res.status(201).json({
                message: `Hope you enjoy your first visit ${newCustomer.username}!`,
                data: {
                    id: newCustomer.id,
                    username: newCustomer.username,
                    profilePicture: newCustomer.profilePicture,
                    email: newCustomer.email,
                    access_token: jwtToken,
                },
            })
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        const { email, password } = req.body
        try {
            if (!email || !password) {
                throw {
                    name: "InsufficientInput",
                    fields: ["email", "password"],
                }
            }

            const queriedCustomer = await Customer.findOne({ where: { email } })
            if (!queriedCustomer) throw { name: "InvalidInput" }

            const isValid = validatePassword(password, queriedCustomer.password)
            if (!isValid) throw { name: "InvalidInput" }

            const jwtToken = generateToken({ id: queriedCustomer.id })
            res.set("access_token", jwtToken)
            res.status(200).json({
                message: `Welcome ${queriedCustomer.username}!`,
                data: {
                    id: queriedCustomer.id,
                    username: queriedCustomer.username,
                    profilePicture: queriedCustomer.profilePicture,
                    email: queriedCustomer.email,
                    access_token: jwtToken,
                },
            })
        } catch (err) {
            next(err)
        }
    }

    static async getCustomerDetail(req, res, next) {
        res.status(200).json(req.user)
    }

    static async GoogleLogin(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.headers.google_token,
                audience: process.env.GOOGLE_CLIENT_ID,
            })
            const payload = ticket.getPayload()
            console.log(payload)
            //cari apakah emailnya udah ada di db or not
            let queriedUser = await User.findOne({
                where: { email: payload.email },
            })
            // kalo blom ada ya buatin dulu
            if (!queriedUser) {
                //setelah dibuat, kita reassign queriedUser with the created User
                queriedUser = await User.create(
                    {
                        username: payload.name,
                        email: payload.email,
                        password: "gaAkanMatchLahBro",
                        role: "staff",
                        profilePicture: payload.picture,
                        phoneNumber: null,
                        address: null,
                    },
                    {
                        hooks: false,
                    }
                )
            }
            //jadi dibawah sini, mau si usenrya pertamakali login or emang udh registered di db,
            //queriedUser udah pasti populated with user's data!
            //jadi yaudah, tinggal kt kasih deh jwt tokennya sama segala macem utk ditaro di localStorage
            const jwtToken = generateToken({ id: queriedUser.id })
            res.status(200).json({
                message: `Welcome ${queriedUser.username}!`,
                data: {
                    id: queriedUser.id,
                    username: queriedUser.username,
                    role: queriedUser.role,
                    profilePicture: queriedUser.profilePicture,
                    email: queriedUser.email,
                    access_token: jwtToken,
                },
            })
        } catch (err) {
            next(err)
        }
    }

    static async getAllWishList(req, res, next) {
        try {
            const wishlists = await Wishlist.findAll({
                where: {CustomerId: req.user.id},
                attributes: ['createdAt', 'updatedAt'],
                include: {
                    model: Lodging,
                    include: [
                        {model: User, attributes: { exclude: ["password"] }},
                        {model: Type, attributes: ["name"]},
                    ], 
                }
            })
            res.status(200).json({ message: "OK", data: wishlists })
        } catch (err) {
            next(err)
        }
    }

    static async addWishlist(req, res, next) {
        const {lodgingId} = req.body
        try {
            if (!lodgingId) throw {name: "InsufficientInput", field: 'lodgingId'}
            const queriedLodging = await Lodging.findByPk(lodgingId)
            if (!queriedLodging) throw {
                name: 'NotFound',
                msg: `Lodging with id '${lodgingId}' is not found`
            }

            const customer = await Customer.findByPk(req.user.id)
            if (!customer) throw {name: "InvalidToken"}

            await Wishlist.create({
                CustomerId: customer.id,
                LodgingId: lodgingId
            })

            res.status(201).json({
                message: `Lodging '${queriedLodging.name}' has successfully been added to wishlist`
            })
        } catch (err) {
            next(err)
        }
    }
}
