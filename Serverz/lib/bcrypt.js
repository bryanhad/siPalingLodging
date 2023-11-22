const bcrypt = require("bcryptjs")

function hashPassword(inputPassword) {
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(inputPassword, salt)
    return hashedPassword
}

function validatePassword(inputPassword, hashedPassword) {
    return bcrypt.compareSync(inputPassword, hashedPassword)
}

module.exports = { hashPassword, validatePassword }
