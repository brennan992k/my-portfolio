const logger = require("../logger")
const Tag = require("../models/tag")

module.exports = async () => {
    let items = [{ "name": "react.js" }, { "name": "vue.js" }]
    await Tag.deleteMany()
    logger.info("Cleared Tag collection")
    await Tag.insertMany(items)
    logger.info("Seeded Tag collection")
}
