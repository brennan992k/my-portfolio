const { paginate, mongoose } = require("../mongoose")
const crypto = require('crypto');
const logger = require("../logger");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        max: 32,
        unique: true,
        index: true,
        lowercase: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        max: 32,
        unique: true,
        lowercase: true
    },
    profile: {
        type: String,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    about: {
        type: String
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
    },
    apps: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'app',
        default: []
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    access_token: {
        type: String,
    },
    refresh_token: {
        type: String,
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    },
}
);

UserSchema.virtual('password')
    .set(function (password) {
        // create a temporary variable _password
        this.hashed_password = password;

        // generate salt
        this.salt = this.makeSalt();

        // encrypt password
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this.hashed_password;
    });

UserSchema.methods = {
    authenticate: function (plainText) {
        logger.info("----------------------checking password", this.encryptPassword(plainText), this.hashed_password)
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (error) {
            console.error(error);
            return '';
        }
    },

    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};

UserSchema.plugin(paginate)

const User = mongoose.model('user', UserSchema);

module.exports = User