const app = require("../app")
const { describe, it, expect, afterAll, beforeAll } = require("@jest/globals")
const request = require("supertest")
const { Customer, User, Lodging, Type } = require("../models")

beforeAll(async () => {
    await Customer.bulkCreate(require("../data/customers.json"), {
        individualHooks: true,
    })
    await User.bulkCreate(require("../data/users.json"), {
        individualHooks: true,
    })
    await Type.bulkCreate(require("../data/types.json"))
    await Lodging.bulkCreate(require("../data/lodgings.json"))
})

afterAll(async () => {
    await Lodging.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true,
    })
    await Customer.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true,
    })
    await Type.destroy({ truncate: true, restartIdentity: true, cascade: true })
    await User.destroy({ truncate: true, restartIdentity: true, cascade: true })
})

describe("GET /pub/lodgings", () => {
    it(`get lodgings | no query parameters - 200`, async () => {
        const res = await request(app).get("/pub/lodgings")

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("message", "OK")
        expect(res.body).toHaveProperty("data", expect.any(Array))
        expect(res.body.data[0].id).toBe(1)
        expect(res.body.data.length).toBe(8)
        expect(res.body.data[res.body.data.length-1].id).toBe(8)
        res.body.data.forEach((data) => {
            expect(data).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    facility: expect.any(String),
                    roomCapacity: expect.any(Number),
                    imgUrl: expect.any(String),
                    authorId: expect.any(Number),
                    location: expect.any(String),
                    price: expect.any(Number),
                    status: expect.any(String),
                    typeId: expect.any(Number),
                })
            )
            expect(data).toHaveProperty("User")
        })
    })
    it(`get lodgings | query: location - 200`, async () => {
        const res = await request(app).get(
            "/pub/lodgings?location=Mountain%20Retreat"
        )

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("message", "OK")
        expect(res.body).toHaveProperty("data", expect.any(Array))
        expect(res.body.data.length).toBe(2)
        res.body.data.forEach((data) => {
            expect(data).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    facility: expect.any(String),
                    roomCapacity: expect.any(Number),
                    imgUrl: expect.any(String),
                    authorId: expect.any(Number),
                    location: expect.any(String),
                    price: expect.any(Number),
                    status: expect.any(String),
                    typeId: expect.any(Number),
                })
            )
            expect(data).toHaveProperty("User")
        })
    })
    it(`get lodgings | query: page - 200`, async () => {
        const res = await request(app).get("/pub/lodgings?page=2")

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("message", "OK")
        expect(res.body).toHaveProperty("data", expect.any(Array))
        expect(res.body.data[0].id).toBe(9)
        expect(res.body.data.length).toBe(8)
        expect(res.body.data[res.body.data.length - 1].id).toBe(16)
        res.body.data.forEach((data) => {
            expect(data).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    facility: expect.any(String),
                    roomCapacity: expect.any(Number),
                    imgUrl: expect.any(String),
                    authorId: expect.any(Number),
                    location: expect.any(String),
                    price: expect.any(Number),
                    status: expect.any(String),
                    typeId: expect.any(Number),
                })
            )
            expect(data).toHaveProperty("User")
        })
    })
    it(`get lodgings | /:id - 200`, async () => {
        const res = await request(app).get("/pub/lodgings/20")

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("message", "OK")
        expect(res.body).toHaveProperty("data", expect.any(Object))
        expect(res.body.data).toEqual(
            expect.objectContaining({
                id: 20,
                name: expect.any(String),
                facility: expect.any(String),
                roomCapacity: expect.any(Number),
                imgUrl: expect.any(String),
                authorId: expect.any(Number),
                location: expect.any(String),
                price: expect.any(Number),
                status: expect.any(String),
                typeId: expect.any(Number),
            })
        )
        expect(res.body.data).toHaveProperty("User")
        expect(res.body.data).toHaveProperty("Type", {
            name: expect.any(String),
        })
    })
    it(`get lodgings | /:id not found - 404`, async () => {
        const res = await request(app).get("/pub/lodgings/21")

        expect(res.status).toBe(404)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body).toHaveProperty(
            "message",
            `Lodging with id '21' is not found`
        )
    })
})
