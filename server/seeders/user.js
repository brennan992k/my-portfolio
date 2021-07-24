const faker = require('faker');
const { md5 } = require("../utils/crypto")
const User = require("../models/user");
const logger = require('../logger');

module.exports = async () => {
    let items = [];
    for (i = 0; i < 15; i++) {
        items.push(
            {
                name: faker.name.findName(),
                phone: faker.phone.phoneNumber(),
                email: faker.internet.email(),
                introduce: faker.lorem.paragraph(),
                avatar: faker.image.avatar(),
                password: md5("Gnha992k"),
                type: faker.random.arrayElement([0, 1, 2, 3])
            }
        )
    }

    await User.deleteMany()
    logger.info("Cleared User collection")
    // await User.insertMany(items)
    logger.info("Seeded User collection")
}