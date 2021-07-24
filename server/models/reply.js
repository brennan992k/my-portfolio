const { paginate, mongoose } = require("../mongoose")

const CommentSchema = new mongoose.Schema({
    article_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true, validate: /\S+/
    },
    like_users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'user',
        default: []
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
        required: true
    },
    // Status => 0 Pending review / 1 Passed normally / -1 Deleted / -2 Spam comment
    state: { type: Number, default: 1 },
    // Has it been processed => 1 yes / 2 no newly added comments need to be reviewed to prevent users from adding spam comments
    is_handle: { type: Number, default: 2 },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
})

CommentSchema.plugin(paginate)

const Comment = mongoose.model('reply', CommentSchema)

module.exports = Comment
