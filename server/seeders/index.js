const { conection } = require("../mongoose")
const userSeeding = require("./user")
const tagSeeding = require("./tag")
const permissionSeeding = require("./permission")
const roleSeeding = require("./role")
const appSeeding = require("./app")
const categorySeeding = require("./category")
const articleSeeding = require("./article")
const apiSeeding = require("./api")
const logger = require("../logger")

module.exports.seed = async () => {
    try {
        await conection()
        // await apiSeeding()
        // await tagSeeding()
        // await categorySeeding()
        // await permissionSeeding()
        // await roleSeeding()
        // await appSeeding()
        // await userSeeding()
        await articleSeeding()
        process.exit()
    } catch (error) {
        logger.info(error)
        process.exit()
    }
}