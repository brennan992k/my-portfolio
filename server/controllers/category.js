const Category = require('../models/category')
const { QueryRules } = require("../mongoose")
const Controller = require("./controller")
const _ = require("lodash")

class CategoryController extends Controller {

    contructorFields = ["name", "desc", "icon"]

    constructor() {
        super(Category)
    }

    readByPage2 = async (options, completion = (error, data) => { }) => {
        const { page = 1, limit = 1000, sort } = options
        const query = new QueryRules(options, {
            key: (str) => ({ $or: [{ name: { $regex: new RegExp(str, 'i') } }, { desc: { $regex: new RegExp(str, 'i') } }] }),
        }).generateQuery();
        this.readByPage(query, { page, limit , sort }, completion)
    }
}

const controller = CategoryController.shared()

module.exports = controller
