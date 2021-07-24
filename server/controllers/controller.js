const _ = require("lodash")
const logger = require("../logger")

class Controller {

    static instance

    contructorFields = []

    privateItem = []
    privateList = []
    readPrivate = false // overide perivate Item and private List

    populatePaths = []

    constructor(Model) {
        this._Model = Model
    }

    static createInstance() {
        const obj = new this()
        return obj
    }

    static shared() {
        if (!this.instance) this.instance = this.createInstance()
        return this.instance
    }

    shouldReadPrivate(should) {
        this.readPrivate = should
    }

    getPrivateList = () => {
        if (this.readPrivate) return

        const fields = this.privateList.join(" -")
        if (fields.trim()) {
            return "-" + fields.trim()
        }

        return
    }

    getPrivateItem = () => {
        if (this.readPrivate) return

        const fields = this.privateItem.join(" -")
        if (fields.trim()) {
            return "-" + fields.trim()
        }

        return

    }

    read = async (query = {}, completion = (error, data) => { }) => {
        try {
            const data = await this._Model
                .find(query)
                .select(this.getPrivateList())
                .populate(this.populatePaths)
                .exec()

            if (!data || _.isEmpty(data)) {
                throw new Error(`This document does not exist`)
            }

            completion(null, data)
            return {
                data,
                error: null
            }

        } catch (error) {
            completion(error.message, null)
            logger.error(error)
            return {
                error: error.message,
                data: null
            }
        }
    }

    readByPage = async (query = {}, options = {}, completion = (error, data) => { }) => {
        try {
            const data = await this._Model.paginate(query, {
                select: this.getPrivateList(),
                populate: this.populatePaths,
                ...options,
            })

            if (!data || _.isEmpty(data)) {
                throw new Error(`Server error`)
            }

            const { docs } = data;
            if (!docs) {
                throw new Error(`Server error`)
            }

            completion(null, data)
            return {
                error: null,
                data
            }

        } catch (error) {
            completion(error.message, null)
            logger.error(error)
            return {
                error: error.message,
                data: null
            }
        }
    }

    readItem = async (query = {}, completion = (error, data) => { }) => {
        try {
            const doc = await this._Model
                .findOne(query)
                .select(this.getPrivateItem())
                .populate(this.populatePaths)
                .exec()

            if (!doc || _.isEmpty(doc)) {
                throw new Error(`This document does not exist`)
            }

            completion(null, doc)
            return {
                error: null,
                data: doc
            }

        } catch (error) {
            completion(error.message, null)
            logger.error(error)
            return {
                error: error.message,
                data: null
            }
        }
    }

    create = async (data, completion = (error, doc) => { }) => {
        try {
            const keys = Object.keys(data)
            const diff = _.difference(this.contructorFields, keys)
            if (diff.length > 0) {
                throw new Error(`The ${diff.length} ${diff.join(", ")} fields are required`)
            }
            const Model = this._Model
            const newDoc = new Model(data)
            await newDoc.save()

            await this.privateItem.map((field) => {
                newDoc[field] = undefined
            })

            completion(null, newDoc)
            return {
                error: null,
                data: newDoc
            }

        } catch (error) {
            completion(error.message, null)
            logger.error(error)
            return {
                error: error.message,
                data: null
            }
        }
    }

    update = async (query = {}, data, completion = (error, doc) => { }) => {
        try {
            const updatedDoc = await this._Model
                .findOneAndUpdate(query, { ...data, updated_at: Date.now }, { new: true })
                .select(this.getPrivateItem())

            if (!updatedDoc || _.isEmpty(updatedDoc)) {
                throw new Error(`This document does not exist`)
            }

            completion(null, updatedDoc)
            return {
                error: null,
                data: updatedDoc
            }

        } catch (error) {
            completion(error.message, null)
            logger.error(error)
            return {
                error: error.message,
                data: null
            }
        }
    }

    delete = async (query = {}, completion = (error, data) => { }) => {
        try {
            const deletedDoc = await this._Model
                .findOneAndRemove(query)
                .select(this.getPrivateItem())

            if (!deletedDoc || _.isEmpty(deletedDoc)) {
                throw new Error(`This document does not exist`)
            }

            completion(null, deletedDoc)
            return {
                error: null,
                data: deletedDoc
            }

        } catch (error) {
            completion(error.message, null)
            logger.error(error)
            return {
                error: error.message,
                data: null
            }
        }

    }

}


module.exports = Controller
