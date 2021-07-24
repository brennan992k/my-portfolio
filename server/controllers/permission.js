const Permission = require('../models/permission')
const Controller = require("./controller")
const { QueryRules } = require("../mongoose")
const _ = require("lodash")

class PermissionController extends Controller {

    contructorFields = ["name", "permission"]
    populatePaths = [
        { path: 'api' },
    ]

    constructor() {
        super(Permission)
    }

    readByPage2 = async (options, completion = (error, data) => { }) => {
        const { page = 1, limit = 1000, sort } = options
        const query = new QueryRules(options, {
            key: (str) => ({ $or: [{ name: { $regex: new RegExp(str, 'i') } }, { desc: { $regex: new RegExp(str, 'i') } }] }),
        }).generateQuery();
        this.readByPage(query, { page, limit, sort }, completion)
    }
}

const controller = PermissionController.shared()

module.exports = controller
