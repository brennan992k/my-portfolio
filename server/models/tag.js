const { paginate, mongoose } = require("../mongoose")

const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: /\S+/
    },
    desc: {
        type: String,
        validate: /\S+/
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    },
});

TagSchema.plugin(paginate)

Tag = mongoose.model('tag', TagSchema);

module.exports = Tag
