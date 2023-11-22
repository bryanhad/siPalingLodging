const app = require("../app")
const { describe, it, expect, afterAll } = require("@jest/globals")
const request = require("supertest")
const { Customer } = require("../models")


afterAll(async () => {
    await Customer.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true,
    })
})

describe("POST /pub/register", () => {
    it("register successfull - 201", async () => {
        const newCustomer = {
            username: "brodi",
            email: "brodi@gmail.com",
            password: "brodi",
        }
        const res = await request(app).post("/pub/register").send(newCustomer)

        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty(
            "message",
            `Hope you enjoy your first visit ${newCustomer.username}!`
        )
        expect(res.body.data).toHaveProperty("access_token", expect.any(String))
        expect(res.body.data).toHaveProperty("username", newCustomer.username)
        expect(res.body.data).toHaveProperty("email", newCustomer.email)
    })
    it("no email is given - 400", async () => {
        const res = await request(app)
            .post("/pub/register")
            .send({ username: "brodi", password: "brodi" })

        expect(res.status).toBe(400)
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body[0]).toBeInstanceOf(Object)
        expect(res.body[0]).toHaveProperty("inputName", "email")
        expect(res.body[0]).toHaveProperty(
            "message",
            "Please fill in email input"
        )
    })
    it("no password is given - 400", async () => {
        const res = await request(app)
            .post("/pub/register")
            .send({ email: "brodi@gmail.com", username: "brodi" })

        expect(res.status).toBe(400)
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body[0]).toBeInstanceOf(Object)
        expect(res.body[0]).toHaveProperty("inputName", "password")
        expect(res.body[0]).toHaveProperty(
            "message",
            "Please fill in password input"
        )
    })
    it("email is an empty string - 400", async () => {
        const res = await request(app)
            .post("/pub/register")
            .send({ username: "brodi", email: '', password: "brodi" })

        expect(res.status).toBe(400)
        expect(res.body).toBeInstanceOf(Array)
        res.body.forEach(el => expect(el).toBeInstanceOf(Object));
        expect(res.body[0]).toHaveProperty("inputName", "email")
        expect(res.body[0]).toHaveProperty("message", "Please fill in email input")
        expect(res.body[1]).toHaveProperty("inputName", "email")
        expect(res.body[1]).toHaveProperty("message", "Please fill in with a correct email format")
    })
    it("password is an empty string - 400", async () => {
        const res = await request(app)
            .post("/pub/register")
            .send({ username: "brodi", email: 'brodi@gmail.com', password: "" })

        expect(res.status).toBe(400)
        expect(res.body).toBeInstanceOf(Array)
        res.body.forEach(el => expect(el).toBeInstanceOf(Object));
        expect(res.body[0]).toHaveProperty("inputName", "password")
        expect(res.body[0]).toHaveProperty("message", "Please fill in password input")
        expect(res.body[1]).toHaveProperty("inputName", "password")
        expect(res.body[1]).toHaveProperty("message", "Minimum password length is 5 characters!")
    })
    it("Email has been registered - 409", async () => {
        const res = await request(app)
            .post("/pub/register")
            .send({ username: "brodi", email: 'brodi@gmail.com', password: "brodi" })

        expect(res.status).toBe(409)
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body[0]).toBeInstanceOf(Object)
        expect(res.body[0]).toHaveProperty("inputName", "email")
        expect(res.body[0]).toHaveProperty("message", "Email has already been taken!")
    })
    it("Email is filled with wrong email format - 400", async () => {
        const res = await request(app)
            .post("/pub/register")
            .send({ username: "brodi", email: 'brodigmail.com', password: "brodi" })

        expect(res.status).toBe(400)
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body[0]).toBeInstanceOf(Object)
        expect(res.body[0]).toHaveProperty("inputName", "email")
        expect(res.body[0]).toHaveProperty("message", "Please fill in with a correct email format")
    })
})

describe("POST /pub/login", () => {
    it('login successfull - 200', async () => {
        const customer = {
            email: "brodi@gmail.com",
            password: "brodi",
        }

        const res = await request(app)
            .post("/pub/login")
            .send(customer)

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty(
            "message",
            expect.any(String)
        )
        expect(res.body.data).toHaveProperty("id", expect.any(Number))
        expect(res.body.data).toHaveProperty("username", expect.any(String))
        expect(res.body.data).toHaveProperty("email", customer.email)
        expect(res.body.data).toHaveProperty("access_token", expect.any(String))
    })
    it("wrong password - 401", async () => {
        const res = await request(app)
            .post("/pub/login")
            .send({ email: "brodi@gmail.com", password: "brodia" })

        expect(res.status).toBe(401)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body).toHaveProperty("message", "Invalid email or password")
    })  
    it("email is not registered - 401", async () => {
        const res = await request(app)
            .post("/pub/login")
            .send({ email: "brodiaaa@gmail.com", password: "brodi" })

        expect(res.status).toBe(401)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body).toHaveProperty("message", "Invalid email or password")
    })  
})