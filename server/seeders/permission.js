const logger = require("../logger")
const Permission = require("../models/permission")
const API = require("../models/api")
const faker = require("faker")

module.exports = async () => {
    const apiList = await API.find() ?? []
    const items = await apiList.map(({ name, actions, _id }) => ({
        name,
        api: name,
        actions: faker.random.arrayElements(actions)
    }))

    await Permission.deleteMany()
    logger.info("Cleared Permission collection")
    await Permission.insertMany(items)
    logger.info("Seeded Permission collection")
}
