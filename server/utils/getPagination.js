module.exports = getPagination = (page, size) => {
    let limit = size ? size : 3
    let offset = page ? (page - 1) * limit : 0

    return { limit, offset }
}