const Comment = require('../models/comment')
const { QueryRules } = require("../mongoose")
const Controller = require("./controller")
const _ = require("lodash")

class CommentController extends Controller {

    contructorFields = ["article_id", "author", "content"]
    populatePaths = [
        { path: 'replies' },
        { path: 'author', select: '-password -phone -type -location -update_at -create_at' },
        { path: "like_users", select: '-password -phone -type -location -update_at -create_at' }
    ]

    constructor() {
        super(Comment)
    }

    like = async (data, completion = (error, data) => { }) => {
        try {
            if (_.has(data, "user_id") && _.has(data, "comment_id") && has(data, "like")) {
                const query = { _id: data['comment_id'] }
                this.read(query, async (err, doc) => {
                    if (err) {
                        completion(err, doc)
                    } else {
                        const { like_users = [] } = doc
                        if (data['like'] && !like_users.includes(data['user_id'])) {
                            this.update({ query, data: { like_users: [...like_users, data['user_id']] } }, completion)
                        } else if (!data['like'] && like_users.includes(data['user_id'])) {
                            let newLikes = await like_users.filter((user) => user != data['user_id'])
                            this.update({ query, data: { like_users: newLikes } }, completion)
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
        const { page, limit, sort, } = options
        const query = new QueryRules(options, {
            key: (str) => ({ $or: [{ content: { $regex: new RegExp(str, 'i') } }] }),
        }).generateQuery();
        this.readByPage(query, { page, limit, sort }, completion)
    }
}

const controller = CommentController.shared()

module.exports = controller
