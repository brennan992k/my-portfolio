const express = require('express')
const router = express.Router()
const { preSignup, signup, signin, forgotPassword, resetPassword } = require('../../controllers/auth')
const { runValidation } = require('../../validators')
const { response } = require("../../utils/reqres")
const { userSignupValidator, userSigninValidator, forgotPasswordValidator, resetPasswordValidator } = require('../../validators/auth-validator')

router.post('/pre-signup', userSignupValidator, runValidation, (req, res) => preSignup(req.body, response(res)))

router.post('/signup', (req, res) => signup(req.body, response(res)))

router.post('/signin', userSigninValidator, runValidation, (req, res) => signin(req.body, (error, data) => {
    req.logIn(data, (err) => {
        if (!err) response(res)(null, data)
        else response(res)(err, null)
    })
}))

router.post('/signout', (req, res) => {
    req.logOut()
    response(res)(null, { message: "signed out" })
})

router.post('/forgot-password', forgotPasswordValidator, runValidation, (req, res) => forgotPassword(req.body, response(res, "forgot-password")))

router.post('/reset-password', resetPasswordValidator, runValidation, (req, res) => resetPassword(req.body, response(res, "reset-password")))

module.exports = router
