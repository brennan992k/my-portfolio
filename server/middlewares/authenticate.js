const User = require('../models/user')

const serializeUser = (user, done) => done(user?._id)

const deserializeUser = async (authen, done) => {
    try {
        const data = await User.findOne({ _id: authen })
        if (data) done(null, data)
        else done("not authen", null)
    } catch (error) {
        done(error)
    }
}

exports.initAuthencate = () => (req, res, next) => {
    req.authencate = ({ success = () => { }, failure = () => { } }) => {
        deserializeUser(req.session.user, (error, data) => {
            if (error && !data) {
                req.logOut()
                failure(error)
            } else success(data)
        })
    }

    req.logIn = async (user, callback = (error) => { }) => {
        serializeUser(user, (authen) => {
            if (!authen) callback("not authen")
            else {
                req.session.user = authen
                req.user = authen
                callback(null)
            }
        })
    }

    req.logOut = () => {
        req.session.user = undefined
        req.user = undefined
        req.session.permissions = undefined
    }

    req.isAuthenticated = () => req.session.user && req.user
    next()
};

