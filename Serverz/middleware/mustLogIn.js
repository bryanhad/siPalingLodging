const { decodeToken } = require("../lib/jwt")
const { User, Customer } = require("../models")

async function mustLogin(req, res, next) {
    const { access_token } = req.headers

    try {
        if (!access_token) throw { name: "InvalidToken" }

        const decodedToken = decodeToken(access_token)

        let queriedUser = null

        if (req.originalUrl.includes('/pub/')) {
            queriedUser = await Customer.findByPk(decodedToken.id, 
                {attributes: {exclude: ['password', 'createdAt', 'updatedAt']}}
            )
            if (!queriedUser) throw { name: "InvalidToken" }                
        } else {
            queriedUser = await User.findByPk(decodedToken.id)
            if (!queriedUser) throw { name: "InvalidToken" }    
        }

        req.user = queriedUser //add new 'user' key to req, to be used to other handlers
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = mustLogin
