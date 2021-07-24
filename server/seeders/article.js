const faker = require('faker')
const Comment = require("../models/comment")
const Category = require("../models/category")
const Tag = require("../models/tag")
const User = require("../models/user")
const Article = require("../models/article")
const _ = require("lodash")
const logger = require('../logger')
const generateSlug = require("../utils/slugify")

module.exports = async () => {
    const userList = await User.find() ?? []
    const commentList = await Comment.find() ?? []
    const categoryList = await Category.find() ?? []
    const tagList = await Tag.find() ?? []

    let items = []

    for (i = 0; i < 100; i++) {
        let author = "60f9248e2ba41bcc62356986"
        let tags = [_.sample(tagList)?._id]
        let comments = [_.sample(commentList)?._id]
        let categories = [_.sample(categoryList)?._id]
        let title = faker.name.title();
        let slug = await generateSlug(Article, title)
        items.push(
            {
                title,
                author,
                desc: faker.lorem.paragraph(),
                content: faker.lorem.paragraphs(),
                tags,
                comments,
                categories,
                slug,
                img_url: faker.image.imageUrl(600, 400, "girl", true)
            }
        )
    }
    await Article.deleteMany()
    logger.info("Cleared article collection")
    await Article.insertMany(items)
    logger.info("Seeded article collection")
}

