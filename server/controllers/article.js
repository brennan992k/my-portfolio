const Article = require('../models/article')
const { QueryRules, mongoose } = require("../mongoose")
const Controller = require("./controller")
const _ = require("lodash")

class ArticleController extends Controller {

    contructorFields = ["title", "author", "content", "desc", "tags", "categories"]
    privateList = ["content", "origin", "state", "type", "updated_at"]
    populatePaths = [
        { path: 'tags', select: "name _id" },
        { path: 'comments' },
        { path: 'categories', select: "name _id" },
        { path: 'author', select: 'username name _id profile avatar' },
    ]

    constructor() {
        super(Article)
    }

    readByPage2 = async (options, completion = (error, data) => { }) => {
        const { page = 1, limit = 1000, order = "created_at", desc = 1, cid = "", tid = "" } = options
        const categories = cid ? await cid.split(",").map((str) => mongoose.Types.ObjectId(str)) : []
        const tags = tid ? await tid.split(",").map((str) => mongoose.Types.ObjectId(str)) : []
        const sort = {}
        sort[order] = desc > 0 ? 1 : -1
        const query = new QueryRules(options, {
            cid: (str) => ({ categories: { $all: categories } }),
            tid: (str) => ({ tags: { $all: tags } }),
            key: (str) => ({ $or: [{ title: { $regex: new RegExp(str, 'i') } }, { desc: { $regex: new RegExp(str, 'i') } }] }),
        }).generateQuery();
        return await this.readByPage(query, { page, limit, sort }, completion)
    }
}

const controller = ArticleController.shared()

module.exports = controller
