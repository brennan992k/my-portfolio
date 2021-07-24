const dotenv = require("dotenv")
dotenv.config()

const environment = process.env.NODE_ENV
exports.environment = environment
const isDevMode = Object.is(environment, 'development')
exports.isDevMode = isDevMode
exports.isProdMode = Object.is(environment, 'production')
exports.isTestMode = Object.is(environment, 'test')

exports.MONGODB = {
    uri: process.env.MONGODB_URI || '',
    username: process.env.MONGODB_USERNAME || '',
    password: process.env.MONGODB_PASSWORD || '',
}

exports.SECRET = process.env.SECRET

exports.ADMIN_USER_INFO = {
    nickName: 'brennan',
    email: 'brennanngo1292000@gmail.com',
    location: 'vietnam',
}

exports.PORT = process.env.PORT
exports.HOST = process.env.HOST
exports.ROOT_URL = isDevMode ? process.env.DEV_URL_APP : process.env.PRODUCTION_URL_APP

exports.GITHUB = {
    reqBaseUrl: 'https://api.github.com/repos/brengocompany/images/contents',
    imgBaseUrl: 'https://raw.githubusercontent.com/brengocompany/images/master/',
    token: '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',
};

exports.IMAGE_TYPE = ['png', 'jpg', 'jpeg', 'gif'];

exports.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
exports.EMAIL_FROM = process.env.EMAIL_FROM