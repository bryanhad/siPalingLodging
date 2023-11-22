const { default: axios } = require("axios")
const capitalizeWord = require("../../lib/capitalizeWord")
const getMaxMinPrice = require("../../lib/getMaxMinPrice")
const getPagination = require("../../lib/getPagination")
const { Lodging, User, History, Type } = require("../../models")
const { Op } = require("sequelize")

module.exports = class LodgingController {
    static async getAll(req, res, next) {
        try {
            const lodgings = await Lodging.findAll({
                include: [
                    {
                        model: User,
                        attributes: { exclude: ["password"] },
                    },
                    {
                        model: Type,
                        attributes: ["name"],
                    },
                ],
                order: [["id", "ASC"]],
            })
            res.status(200).json({ message: "OK", data: lodgings })
        } catch (err) {
            next(err)
        }
    }

    static async getAll_Pagination_FilterByLocation(req, res, next) {
        const { page, size, location, pmax, pmin, typeId } = req.query

        const { maxPrice, minPrice } = getMaxMinPrice(pmax, pmin)
        const { offset, limit, pageQuery } = getPagination(page, size)

        const QUERY_OPTION = {
            limit,
            offset,
            include: [
                { model: User, attributes: { exclude: ["password"] } },
                { model: Type, attributes: ["name"] },
            ],
            order: [["id", "ASC"]],
        }
        if (location || maxPrice || minPrice || typeId) QUERY_OPTION.where = {}

        if (location)
            QUERY_OPTION.where.location = { [Op.iLike]: `%${location}%` }
        if (maxPrice && minPrice) {
            QUERY_OPTION.where.price = { [Op.between]: [minPrice, maxPrice] }
        } else {
            if (maxPrice) QUERY_OPTION.where.price = { [Op.lte]: maxPrice }
            if (minPrice) QUERY_OPTION.where.price = { [Op.gte]: minPrice }
        }
        if (typeId) QUERY_OPTION.where.typeId = typeId

        try {
            const { count, rows } = await Lodging.findAndCountAll(QUERY_OPTION)

            const totalPages = limit >= count ? 1 : Math.ceil(count / limit)

            res.status(200).json({
                message: "OK",
                totalItems: count,
                currentPage: pageQuery,
                totalPages, 
                data: rows,
            })
        } catch (err) {
            next(err)
        }
    }

    static async createNew(req, res, next) {
        try {
            const newLodging = await Lodging.create({
                ...req.body,
                authorId: req.user.id,
            })
            res.status(201).json({
                message: `Succeeded add new Lodging '${newLodging.name}'`,
                data: newLodging,
            })
            await History.create({
                title: newLodging.name,
                description: `new entity with id '${newLodging.id}' created`,
                updatedBy: req.user.email,
            })
        } catch (err) {
            next(err)
        }
    }

    static async getById(req, res, next) {
        const { id } = req.params

        try {
            const queriedLodging = await Lodging.findOne({
                where: { id },
                include: [
                    { model: User, attributes: { exclude: ["password"] } },
                    { model: Type, attributes: ["name"] },
                ],
            })
            if (!queriedLodging)
                throw {
                    name: "NotFound",
                    msg: `Lodging with id '${id}' is not found`,
                }

            res.status(200).json({ message: "OK", data: queriedLodging })
        } catch (err) {
            next(err)
        }
    }

    static async deleteById(req, res, next) {
        const { id } = req.params

        try {
            const queriedLodging = await Lodging.findOne({ where: { id } })

            if (!queriedLodging)
                throw {
                    name: "NotFound",
                    msg: `Lodging with id '${id}' is not found`,
                }

            await queriedLodging.destroy()

            res.status(200).json({
                message: `Lodging with name '${queriedLodging.name}' has successfully been deleted`,
                data: queriedLodging,
            })
        } catch (err) {
            next(err)
        }
    }

    static async updateLodging(req, res, next) {
        const { id } = req.params

        try {
            const queriedLodging = await Lodging.findOne({ where: { id } })
            if (!queriedLodging)
                throw {
                    name: "NotFound",
                    msg: `Lodging with id '${id}' is not found`,
                }
            if (req.body.status) delete req.body.status
            await queriedLodging.update(req.body)

            res.status(200).json({
                message: `Lodging with name '${queriedLodging.name}' has successfully been updated`,
            })
            await History.create({
                title: queriedLodging.name,
                description: `entity with id '${queriedLodging.id}' updated`,
                updatedBy: req.user.email,
            })
        } catch (err) {
            next(err)
        }
    }

    static async updateStatus(req, res, next) {
        const { id } = req.params
        const status = req.body.status

        try {
            if (!status) {
                throw { name: "InsufficientInput", field: "status" }
            }

            const queriedLodging = await Lodging.findOne({ where: { id } })
            if (!queriedLodging)
                throw {
                    name: "NotFound",
                    msg: `Lodging with id '${id}' is not found`,
                }

            await History.create({
                title: queriedLodging.name,
                description: `entity status with id '${queriedLodging.id}' has been updated from ${queriedLodging.status} into ${status}`,
                updatedBy: req.user.email,
            })
            await queriedLodging.update({ status })

            res.status(200).json({
                message: `Successfully updated lodging '${
                    queriedLodging.name
                }' status to ${capitalizeWord(status)}`,
            })
        } catch (err) {
            next(err)
        }
    }

    static async get_QRCode(req, res, next) {
        const { id } = req.params
        try {
            const queriedLodging = await Lodging.findByPk(id)
            if (!queriedLodging)
                throw {
                    name: "NotFound",
                    msg: `Lodging with id '${id}' is not found`,
                }
            const { data } = await axios({
                url: `https://api.qr-code-generator.com/v1/create?access-token=${process.env.QR_API_KEY}`,
                method: "POST",
                data: {
                    frame_name: "no-frame",
                    qr_code_text: process.env.CLIENT_URL + `/detail/${id}`,
                    image_format: "SVG",
                    qr_code_logo: "scan-me-square",
                },
            })
            res.status(200).json(data)
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}
