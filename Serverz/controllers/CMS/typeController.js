const { Type, Lodging } = require("../../models")
const { Op } = require("sequelize")

module.exports = class TypeController {
    static async getAll(req, res, next) {
        try {
            const types = await Type.findAll({
                order: [["id", "ASC"]],
                where: {
                    id: { [Op.ne]: 1 },
                },
            })
            res.status(200).json({ message: "OK", data: types })
        } catch (err) {
            next(err)
        }
    }

    static async createNew(req, res, next) {
        try {
            const newType = await Type.create({ name: req.body.name })
            res.status(201).json({
                message: `Succeeded add new '${newType.name}' type`,
                data: newType,
            })
        } catch (err) {
            next(err)
        }
    }

    static async editById(req, res, next) {
        const { id } = req.params

        try {
            const queriedType = await Type.findOne({ where: { id } })
            if (!queriedType)
                throw {
                    name: "NotFound",
                    msg: `Type with id '${id}' is not found`,
                }
            await queriedType.update({ name: req.body.name })

            res.status(200).json({
                message: `Type '${queriedType.name}' has successfully been updated`,
            })
        } catch (err) {
            next(err)
        }
    }

    static async deleteById(req, res, next) {
        const { id } = req.params

        try {
            const queriedType = await Type.findOne({ where: { id } })

            if (!queriedType)
                throw {
                    name: "NotFound",
                    msg: `Type with id '${id}' is not found`,
                }

            await queriedType.destroy()

            const lodgings = await Lodging.findAll({ where: { typeId: null } })
            lodgings.forEach((lodging) => {
                lodging.update({ typeId: 1 })
            })

            res.status(200).json({
                message: `Type '${queriedType.name}' has successfully been deleted`,
                data: queriedType,
            })
        } catch (err) {
            next(err)
        }
    }
}
