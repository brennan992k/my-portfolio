const { paginate, mongoose } = require("../mongoose")

const APISchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: /\S+/
    },
    desc: {
        type: String,
        validate: /\S+/
    },
    version: {
        type: String,
        validate: /\S+/,
        default: "v1",
    },
    // 0 - full  1 - create, 2-read, 3 - update, 4 -delete
    actions: {
        type: [Number],
        default: [0, 1, 2, 3, 4]
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

APISchema.plugin(paginate)

API = mongoose.model('api', APISchema);

module.exports = API
