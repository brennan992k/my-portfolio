const logger = require("../logger")
const API = require("../models/api")

module.exports = async () => {
    let items = [
        { name: "article", version: "v1" },
        { name: "user", version: "v1" },
        { name: "api", version: "v1" },
        { name: "tag", version: "v1" },
        { name: "category", version: "v1" },
        { name: "reply", version: "v1" },
        { name: "comment", version: "v1" },
        { name: "app", version: "v1" },
        { name: "role", version: "v1" },
        { name: "permission", version: "v1" },
    ]

    await API.deleteMany()
    logger.info("Cleared API collection")
    await API.insertMany(items)
    logger.info("Seeded API collection")
}
