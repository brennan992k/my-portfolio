const { paginate, mongoose } = require("../mongoose")

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: /\S+/
    },
    desc: {
        type: String,
        default: ''
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    },
})


CategorySchema.plugin(paginate)

const Category = mongoose.model('category', CategorySchema)

module.exports = Category
