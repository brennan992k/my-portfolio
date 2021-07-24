const { paginate, mongoose } = require("../mongoose")

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: /\S+/
    },
    permissions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'permission',
        default: []
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

RoleSchema.plugin(paginate)

Role = mongoose.model('role', RoleSchema);

module.exports = Role
