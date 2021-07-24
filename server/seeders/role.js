const logger = require("../logger")
const Role = require("../models/role")
const Permission = require("../models/permission")

module.exports = async () => {
    const permissions = await Permission.find() ?? []
    let items = [
        { name: "admin", permissions: await permissions.map(({ _id }) => _id) },
        { name: "user", permissions: await permissions.map(({ _id }) => _id) },
        { name: "customer", permissions: await permissions.map(({ _id }) => _id) },
    ]

    await Role.deleteMany()
    logger.info("Cleared Role collection")
    await Role.insertMany(items)
    logger.info("Seeded Role collection")
}
