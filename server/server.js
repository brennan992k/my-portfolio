const express = require("express")
const session = require("express-session")
const next = require("next")
const compression = require("compression")
const helmet = require("helmet")
const MongoStore = require('connect-mongo');
const mongoose = require('./mongoose')
const logger = require('./logger');
const api = require('./api')
const { initAuthencate } = require("./middlewares/authenticate")

const { MONGODB, PORT, COOKIE_DOMAIN, SECRET, isDevMode } = require('./configs')

/* ===== Connect mongoose ===== */
mongoose.conection()

/* ===== Custom server ===== */
const app = next({ dev: isDevMode })
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express()

    server.use(helmet({ contentSecurityPolicy: false }))
    server.use(compression())
    server.use(express.json())
    server.use(express.urlencoded())

    /* give all Nextjs's request to Nextjs server */
    server.get('/_next/*', (req, res) => {
        handle(req, res);
    })

    const sess = {
        secret: SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 14 * 24 * 60 * 60 * 1000, // expires in 14 days
        },
        store: MongoStore.create({
            mongoUrl: MONGODB.uri,
            ttl: 14 * 24 * 60 * 60, // expires in 14 days
        })
    }

    if (!isDevMode) {
        server.set('trust proxy', 1); // sets req.hostname, req.ip
        sess.cookie.secure = true; // sets cookie over HTTPS only
        sess.cookie.domain = COOKIE_DOMAIN; // sets domain for production env
    }

    server.use(session(sess))

    /*==== Check permission ====*/
    server.use(initAuthencate())

    /*==== API ==== */
    api(server)

    server.get('*', (req, res) => {
        logger.info(req.path)
        handle(req, res)
    })

    server.listen(PORT, (err) => {
        if (err) throw err
        logger.info(`Ready on ${PORT}`)
    });
})