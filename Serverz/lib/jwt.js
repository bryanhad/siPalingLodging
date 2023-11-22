const jwt = require("jsonwebtoken")

function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET)
}

function decodeToken(jwtToken) {
    return jwt.verify(jwtToken, process.env.JWT_SECRET)
}

module.exports = { generateToken, decodeToken }
