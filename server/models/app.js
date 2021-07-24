const { paginate, mongoose } = require("../mongoose")

const AppSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: /\S+/
    },
    desc: {
        type: String,
        validate: /\S+/,
    },
    icon: {
        type: String,
        validate: /\S+/,
        default: "/app.png"
    },
    // 0- normal, 1- user is added
    type: {
        type: Number,
        validate: /\S+/,
        default: 1
    },
    link: {
        type: String,
        required: true,
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

AppSchema.plugin(paginate)

App = mongoose.model('app', AppSchema);

module.exports = App
