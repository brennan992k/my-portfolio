const { mongoose, paginate } = require("../mongoose")
const generateSlug = require("../utils/slugify")

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        validate: /\S+/
    },
    slug: {
        type: String,
        validate: /\S+/
    },
    desc: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        required: true,
        validate: /\S+/
    },
    img_url: {
        type: String,
        default: '/article.png'
    },
    // Article publishing status => 0 draft, 1 published
    state: {
        type: Number,
        default: 1
    },
    // Article reprint status => 0 original, 1 reprint, 2 mixed
    origin: {
        type: Number,
        default: 0
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    tags: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'tag',
        required: true
    },
    categories: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'category',
        required: true
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'comment',
        default: []
    },
    like_users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'user',
        default: []
    },
    meta: {
        views: {
            type: Number,
            default: 0
        }
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
});


ArticleSchema.pre("save", async function (next) {
    const article = this
    if (article.title) {
        article.slug = await generateSlug(Article, article.title)
    } else {
        throw new Error("title is empty")
    }
    next()
})

ArticleSchema.plugin(paginate)

const Article = mongoose.model('article', ArticleSchema);

module.exports = Article
