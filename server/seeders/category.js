const Category = require("../models/category")
const logger = require('../logger')

module.exports = async () => {
    let items = [
        {
            "desc": "mongodb",
            "name": "mongodb",
        },
        {
            "desc": "node",
            "name": "node",
        },
        {
            "desc": "python",
            "name": "python",
        }
    ]
    
    await Category.deleteMany()
    logger.info("Cleared Category collection")
    await Category.insertMany(items)
    logger.info("Seeded Category collection")
}