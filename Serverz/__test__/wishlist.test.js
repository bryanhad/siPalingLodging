const app = require("../app")
const { describe, it, expect, afterAll, beforeAll } = require("@jest/globals")
const request = require("supertest")
const { Customer, User, Lodging, Type, Wishlist } = require("../models")

let access_token

beforeAll(async () => {
    await Customer.bulkCreate(require("../data/customers.json"), {individualHooks: true})
    await User.bulkCreate(require("../data/users.json"), {individualHooks: true})
    await Type.bulkCreate(require("../data/types.json"))
    await Lodging.bulkCreate(require("../data/lodgings.json"))
    await Wishlist.bulkCreate(require("../data/wishlist.json"))

    const res = await request(app)
        .post("/pub/login")
        .send({email: 'micin@gmail.com', password: 'micin'})
    
    access_token = res.body.data.access_token
})

afterAll(async () => {
    await Wishlist.destroy({truncate: true, restartIdentity: true, cascade:true })
    await Lodging.destroy({truncate: true, restartIdentity: true, cascade:true })
    await Customer.destroy({truncate: true, restartIdentity: true, cascade: true})
    await Type.destroy({truncate: true, restartIdentity: true, cascade:true })
    await User.destroy({truncate: true, restartIdentity: true, cascade:true })
})  

describe('/pub/wishlists', () => {
    it('get all wishlists based on logged in customer - 200', async () => {
        const res = await request(app)
            .get('/pub/wishlists')
            .set('access_token', access_token)
        
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('message', 'OK')
        expect(res.body).toHaveProperty('data', expect.any(Array))
        expect(res.body.data.length).toBe(2)
        res.body.data.forEach(data => {
            expect(data).toHaveProperty('createdAt')
            expect(data).toHaveProperty('updatedAt')
            expect(data.Lodging).toEqual(
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
                    User: expect.objectContaining({
                        id: expect.any(Number),
                        username: expect.any(String),
                        email: expect.any(String),
                    }),
                    Type: expect.objectContaining({
                        name: expect.any(String)
                    })
                })
            )
        });
    })
    it('successfully add wishlist', async () => {
        const requestBody = {lodgingId: 5}
        const res = await request(app)
            .post('/pub/wishlists')
            .send(requestBody)
            .set('access_token', access_token)
        
        expect(res.status).toBe(201)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body).toHaveProperty('message', `Lodging 'Rustic Cabin' has successfully been added to wishlist`)
    })
    it('fail to add wishlist because lodging Id is not found - 404', async () => {
        const requestBody = {lodgingId: 21}
        const res = await request(app)
            .post('/pub/wishlists')
            .send(requestBody)
            .set('access_token', access_token)

        expect(res.status).toBe(404)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body).toHaveProperty('message', `Lodging with id '${requestBody.lodgingId}' is not found`)
    })
    it(`fail to get wishlists because customer haven't logged in - 401`, async () => {
        const res = await request(app)
            .get('/pub/wishlists')
            .set('access_token', null)
        
        expect(res.status).toBe(401)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body).toHaveProperty('message', "Invalid Token")
    })
    it(`fail to get wishlists because customer's token isn't valid - 401`, async () => {
        const res = await request(app)
            .get('/pub/wishlists')
            .set('access_token', 'bruh')
        
        expect(res.status).toBe(401)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body).toHaveProperty('message', "Invalid Token")
    })
})