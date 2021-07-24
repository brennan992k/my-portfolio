const { paginate, mongoose } = require("../mongoose")

const PermissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: /\S+/
    },
    api: {
        type: String,
        required: true,
    },
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

PermissionSchema.plugin(paginate)

Permission = mongoose.model('permission', PermissionSchema);

module.exports = Permission
