const tag = require("../../../controllers/tag")
const { response } = require("../../../utils/reqres")
const withController = require("./withController")

module.exports = withController(tag, (req, res, next, action) => {
    switch (action) {
        case "read all":
            req.authencate({
                success: () => {
                    next()
                },
                failure: () => response(res)("not authencated")
            })
            break
        case "read":
            authencate(req, res, next)
            break
        case "create":
            next()
            break
        case "update":
            next()
            break
        case "delete":
            next()
            break
        default:
            next()
            break
    }
})
