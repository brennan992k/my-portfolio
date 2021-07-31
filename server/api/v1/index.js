const user = require('./user');
const auth = require('./auth');
const category = require('./category')
const tag = require('./tag')
const comment = require("./comment")
const reply = require("./reply")
const article = require("./article")
const upload = require("./upload")
const role = require("./role")
const app = require("./app")
const permission = require("./permission")

module.exports = (server) => {
    // config
    server.use('/api/v1/tag', tag);
    server.use('/api/v1/category', category);
    server.use('/api/v1/app', app);
    server.use('/api/v1/permission', permission);
    server.use('/api/v1/role', role);

    //auth
    server.use('/api/v1/auth', auth);

    //authenticated
    server.use('/api/v1/user', user);
    server.use('/api/v1/comment', comment);
    server.use('/api/v1/reply', reply);
    server.use('/api/v1/article', article);
    server.use('/api/v1/upload', upload);
}

