const { response } = require("../../../utils/reqres")
const uploadController = require("../../../controllers/upload")
const express = require("express")
// const multer = require("multer")

// const upload = multer({ dest: 'upload/blog/img/' })

const router = express.Router()

router.post("/",  (req, res) => {
    console.log(req.files, req.file, req.body, req.params)
    // const { storage, image_title, path } = req.body;
    // const file = req.files[0];
    // const type = file.mime.split('/')[1];
    // const title = (path || '/blog/common/') + new Date().getTime() + '.' + type;
    // const createted_at = service.tools.time();
    // uploader.upload(type, file, title, createted_at, (error, data) => {
    //     if (data) {
    //         response(res, 200, "success", "uploaded", data)
    //     } else {
    //         response(res, 400, "failure", "upload failed", data)
    //     }
    // });
})

module.exports = router