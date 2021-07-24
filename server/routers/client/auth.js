const express = require("express")
const router = express.Router()

module.exports = (app) => {
    router.get("/signin", (req, res) => app.render(req, res, '/account/signin'))
    router.get("/signup", (req, res) => app.render(req, res, '/account/signup'))
    router.get("/forgot", (req, res) => app.render(req, res, '/account/signup'))
    return router
}