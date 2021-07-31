const { response } = require("../../utils/reqres")
const express = require("express")

/**
 * 
 * @param {object} controller 
 * @param {function} middleware -- (req, res, next, action) => {}, with action param is enum value ( 'read all' || 'read' || 'create' || 'update' || 'delete')
 * @returns 
 */
module.exports = (controller, middleware = (req, res, next, action) => next()) => {
    const middle = (action) => (req, res, next) => {
        if (typeof middleware == 'function') {
            middleware(req, res, next, action)
        } else next()
    }

    const router = express.Router()

    router.get('/', middle("read all"), (req, res) => controller.readByPage2(req.query, response(res)));

    router.post('/detail', middle("read"), (req, res) => controller.readItem(req.body, response(res)));

    router.post('/create', middle("create"), (req, res) => controller.create(req.body, response(res)));

    router.post('/update', middle("update"), (req, res) => controller.update(req.body, response(res)));

    router.post('/delete', middle("delete"), () => controller.delete(req.body, response(res)));

    return router
}