const auth = require("./auth")

module.exports = (server, app) => {
    server.use("/account", (req, res, next) => {
        // req.logOut()
        req.authencate({
            success: () => res.redirect("/"),
            failure: () => next()
        })
    }, auth(app))
}