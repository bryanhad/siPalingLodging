const { History } = require("../../models")

module.exports = class HistoriesController {
    static async getAll(req, res, next) {
        try {
            const histories = await History.findAll({ order: [["id", "DESC"]] })
            res.status(200).json({ message: "OK", data: histories })
        } catch (err) {
            next(err)
        }
    }
}
