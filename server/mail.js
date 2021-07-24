const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = require("./configs")

sgMail.setApiKey(SENDGRID_API_KEY);


exports.sendMail = (to, from, subject, body) => {
    if (to && from) {
        sgMail.send({
            to,
            from,
            subject,
            html: body
        })
    } else throw new Error("Mail hasn't to or from")
}


exports.templates = {
    activeAccount: (link) => `
        <h4>Please use the following link to activate your account:</h4>
        <p>${link}</p>

        <hr/>
        <p>This email may contain sensitive information</p>
    `,
    resetPassword: (link) => `
        <h4>Please use the following link to reset your password:</h4>
        <p>${link}</p>
        <hr/>
        <p>This email may contain sensitive information</p>
    `,


}