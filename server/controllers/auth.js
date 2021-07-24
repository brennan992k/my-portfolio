const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const _ = require('lodash')
const User = require('./user')
const Role = require('./role')
const App = require('./app')
const { ROOT_URL, SECRET, EMAIL_FROM } = require("../configs")
const { templates, sendMail } = require("../mail")
const logger = require('../logger')

exports.preSignup = async (data, completion = (error, data) => { }) => {
    try {

        const { email } = data
        const user = await User.readItem({ email: email.toLowerCase() })

        logger.info("pre signup  find user", user)

        if (user.data) throw new Error("Email already is registed")

        const token = jwt.sign(data, SECRET, { expiresIn: '10m' })
        const body = templates.activeAccount(`${ROOT_URL}/account/activate/${token}`)
        sendMail(email, EMAIL_FROM, "Active Account", body)

        completion(null, { message: "Please check email to validator" })
        return

    } catch (error) {
        completion(error.message, null)
        logger.info("pre signup  error", error.message)
        return
    }
}

exports.signup = (data, completion = (error, data) => { }) => {
    try {
        const { token } = data

        jwt.verify(token, SECRET, async (err, decoded) => {
            if (err || !decoded) {
                completion('Expired link. Signup again.', null)
                return
            }
            logger.info("signup  token vertify decoded", decoded)

            const { name, email, password } = decoded
            const username = shortId.generate()
            const profile = `${ROOT_URL}/profile/${username}`

            let role = await Role.readItem({ name: "user" })
            if (role.error) throw new Error(role.error)
            if (role.data) role = role.data._id

            let apps = await App.read({ type: 1 })
            if (apps.error) throw new Error(apps.error)
            if (apps.data) apps = apps.data.map(({ _id }) => _id)

            User.create({ name, email, password, profile, username, role: role, apps }, completion)
            return
        })

    } catch (error) {
        completion(error.message, null)
        logger.info("signup  error", error.message)
        return
    }

}

exports.signin = async (data, completion = (error, data) => { }) => {
    try {
        const { email, password } = data

        await User.shouldReadPrivate(true)
        let user = await User.readItem({ email: email.toLowerCase() })
        await User.shouldReadPrivate(false)
        logger.info("signin  find user ", user)

        if (user.error) throw new Error(user.error)
        if (!user.data) throw new Error('User with that email does not exist. Please signup.')
        if (!user.data.authenticate(password)) throw new Error('Email and password do not match.')
        user = user.data

        /*==== Update access_token and return to client  ====*/
        const access_token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: '30d' })
        const refresh_token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: '31d' })

        let updatedUser = await User.update({ _id: user._id, email: email.toLowerCase() }, { access_token, refresh_token })
        if (updatedUser.error) throw new Error(user.error)
        if (!updatedUser.data) throw new Error('User with that email does not exist. Please signup.')
        updatedUser = updatedUser.data

        logger.info("signin  updated user", updatedUser.data)

        completion(null, updatedUser)

    } catch (error) {
        completion(error.message, null)
        logger.info("signin  error", error.message)
        return
    }
}


exports.requireSignin = expressJwt({
    secret: SECRET,
    algorithms: ['RS256']
})

exports.forgotPassword = async (data, completion = (error, data) => { }) => {
    try {
        const { email } = data

        let user = await User.readItem({ email: email.toLowerCase() })
        if (user.error) throw new Error(user.error)
        if (!user.data) throw new Error('User with that email does not exist')
        logger.info("forgot password  find user", user)

        user = user.data
        const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: '10m' })
        const body = templates.resetPassword(`${ROOT_URL}/account/password/reset/${token}`)
        sendMail(email, EMAIL_FROM, "Reset password", body)

        completion(null, { message: "Please check email to validator" })
        return

    } catch (error) {
        completion(error.message, null)
        logger.info("forgot password  error", error.message)
        return
    }

}

exports.resetPassword = async (data, completion = (error, data, accessToken)) => {
    try {
        const { token, newPassword } = data

        jwt.verify(token, SECRET, async (err, decoded) => {

            if (err || !decoded) {
                completion('Expired link. Try again', null)
                return
            }

            logger.info("reset password  decoded token", decoded)

            const { _id } = decoded
            const user = await User.update({ _id }, { password: newPassword })
            if (!user.error) throw new Error(user.error)
            if (!user.data) throw new Error('Something went wrong. Try later')

            logger.info("reset password  find user", user)

            completion(null, { message: `Great! Now you can login with your new password` })
        })
    } catch (Error) {
        completion(error.message, null)
        logger.info("reset password  error", error.message)
        return
    }
}