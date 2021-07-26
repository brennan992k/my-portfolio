const logger = require("../logger")
const Tag = require("../models/tag")

module.exports = async () => {
    let items = [
        { "name": "react.js" },
        { "name": "vue.js" },
        { "name": "dart" },
        { "name": "react native" },
        { "name": "swift" },
        { "name": "ios" },
        { "name": "php" },
        { "name": "mongoose" },
        { "name": "mysql" },
        { "name": "html" },
        { "name": "css3" },
        { "name": "docker" },
        { "name": "figma" },
        { "name": "combine and Rxswift" },
        { "name": "express" },
    ]
    await Tag.deleteMany()
    logger.info("Cleared Tag collection")
    await Tag.insertMany(items)
    logger.info("Seeded Tag collection")
}
