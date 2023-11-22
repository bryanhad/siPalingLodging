const { validatePassword } = require("../../lib/bcrypt")
const { generateToken } = require("../../lib/jwt")
const { User } = require("../../models")
const { OAuth2Client } = require("google-auth-library")
const client = new OAuth2Client()

module.exports = class UserController {
    static async totalCount(req, res, next) {
        try {
            const userCount = await User.count()
            res.status(200).json({ data: userCount })
        } catch (err) {
            next(err)
        }
    }

    static async register(req, res, next) {
        try {
            const newUser = await User.create(req.body)
            const jwtToken = generateToken({ id: newUser.id })
            res.status(201).json({
                message: `Hope you enjoy your first visit ${newUser.username}!`,
                data: {
                    id: newUser.id,
                    username: newUser.username,
                    role: newUser.role,
                    profilePicture: newUser.profilePicture,
                    email: newUser.email,
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

            const queriedUser = await User.findOne({ where: { email } })
            if (!queriedUser) throw { name: "InvalidInput" }

            const isValid = validatePassword(password, queriedUser.password)
            if (!isValid) throw { name: "InvalidInput" }

            const jwtToken = generateToken({ id: queriedUser.id })
            res.set("access_token", jwtToken)
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

    static async GoogleLogin(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.headers.google_token,
                audience: process.env.GOOGLE_CLIENT_ID,
            })
            const payload = ticket.getPayload()
            console.log(payload)
            //cari apakah emailnya udah ada di db or not
            let queriedCustomer = await Customer.findOne({
                where: { email: payload.email },
            })
            // kalo blom ada ya buatin dulu
            if (!queriedCustomer) {
                //setelah dibuat, kita reassign queriedCustomer with the created Customer
                queriedCustomer = await Customer.create(
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
            //queriedCustomer udah pasti populated with Customer's data!
            //jadi yaudah, tinggal kt kasih deh jwt tokennya sama segala macem utk ditaro di localStorage
            const jwtToken = generateToken({ id: queriedCustomer.id })
            res.status(200).json({
                message: `Welcome ${queriedCustomer.username}!`,
                data: {
                    id: queriedCustomer.id,
                    username: queriedCustomer.username,
                    role: queriedCustomer.role,
                    profilePicture: queriedCustomer.profilePicture,
                    email: queriedCustomer.email,
                    access_token: jwtToken,
                },
            })
        } catch (err) {
            next(err)
        }
    }
}
