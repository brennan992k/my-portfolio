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
        { path: "like_users", select: 'username name _id profile avatar' }
    ]

    constructor() {
        super(Article)
    }

    like = async (data, completion = (error, data) => { }) => {
        try {
            if (_.has(data, "user_id") && _.has(data, "article_id") && has(data, "like")) {
                const query = { _id: data['article_id'] }
                this.read(query, async (err, doc) => {
                    if (err) {
                        completion(err, doc)
                    } else {
                        const { like_users = [] } = doc
                        if (data['like'] && !like_users.includes(data['user_id'])) {
                            this.update(query, { like_users: [...like_users, data['user_id']] }, completion)
                        } else if (!data['like'] && like_users.includes(data['user_id'])) {
                            let newLikes = await like_users.filter((user) => user != data['user_id'])
                            this.update(query, { like_users: newLikes }, completion)
                        } else {
                            completion(null, doc)
                            return
                        }
                    }
                })

            }
        } catch (error) {
            completion(error.message, null)
            return
        }
    }

    readByPage2 = async (options, completion = (error, data) => { }) => {
        const { page = 1, limit = 1000, sort = { created_at: -1 }, cid = "", tid = "" } = options
        const categories = cid ? await cid.split(",").map((str) => mongoose.Types.ObjectId(str)) : []
        const tags = tid ? await tid.split(",").map((str) => mongoose.Types.ObjectId(str)) : []
        const query = new QueryRules(options, {
            cid: (str) => ({ categories: { $in: categories } }),
            tid: (str) => ({ tags: { $in: tags } }),
            key: (str) => ({ $or: [{ title: { $regex: new RegExp(str, 'i') } }, { desc: { $regex: new RegExp(str, 'i') } }] }),
        }).generateQuery();
        return await this.readByPage(query, { page, limit, sort }, completion)
    }
}

const controller = ArticleController.shared()

module.exports = controller
