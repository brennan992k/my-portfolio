const User = require('../models/user')
const { QueryRules } = require("../mongoose")
const Controller = require("./controller")
const _ = require("lodash")

class UserController extends Controller {

    contructorFields = ["username", "name", "email", "profile", "password"]
    privateList = ["hashed_password"]
    privateItem = ["hashed_password"]
    populatePaths = [
        {
            path: 'role',
            populate: {
                path: 'permissions',
            }
        },
        { path: 'apps' },
    ]

    constructor() {
        super(User)
    }

    readByPage2 = async (options, completion = (error, data) => { }) => {
        const { page = 1, limit = 1000, sort } = options
        const query = new QueryRules(options, {
            key: (str) => ({ $or: [{ name: { $regex: new RegExp(str, 'i') } }, { username: { $regex: new RegExp(str, 'i') } }, { email: { $regex: new RegExp(str, 'i') } }] }),
        }).generateQuery();
        this.readByPage({}, { page, limit, sort }, completion)
    }
}

const controller = UserController.shared()

module.exports = controller
