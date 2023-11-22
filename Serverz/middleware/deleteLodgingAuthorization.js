const { Lodging } = require("../models")

async function deleteLodgingAuthorization(req, res, next) {
    const {id} = req.params

    try {
        const queriedLodging = await Lodging.findByPk(id)
        if (!queriedLodging) throw {
            name: "NotFound",
            msg: `Lodging with id '${id}' is not found`,
        }

        if (req.user.role !== "admin" && queriedLodging.authorId !== req.user.id) {
            throw {
                name: "Forbidden",
                msg: "You are not the owner of this lodging!",
            }
        }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = deleteLodgingAuthorization