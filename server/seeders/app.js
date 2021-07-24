const logger = require("../logger")
const App = require("../models/app")

module.exports = async () => {
    let items = [
        {
            "name": "facebook",
            "icon": "facebook",
            "link": "https://www.facebook.com"
        },
        {
            "name": "youtube",
            "icon": "youtube",
            "link": "https://www.youtube.com"
        }]

    await App.deleteMany()
    logger.info("Cleared App collection")
    await App.insertMany(items)
    logger.info("Seeded App collection")
}
