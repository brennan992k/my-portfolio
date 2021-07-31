const user = require("../../controllers/user")
const withController = require("./withController")


module.exports = withController(user)