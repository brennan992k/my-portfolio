const axios = require('axios');
const fs = require('fs');
const { GITHUB, IMAGE_TYPE } = require("../configs");
const logger = require('../logger');

class UploadController {

    static instance

    static createInstance() {
        const obj = new this()
        return obj
    }

    static shared() {
        if (!this.instance) this.instance = this.createInstance()
        return this.instance
    }

    upload = async (type, file, title, createted_at, completion = (error, data) => { }) => {
        try {
            if (!IMAGE_TYPE.includes(type)) {
                throw new Error('The format is wrong, only supports png, jpg, jpeg, gif format pictures')
            }
            let content = fs.readFileSync(file.filepath);
            content = Buffer.from(content).toString('base64');
            const res = await axios({
                headers: {
                    Authorization: 'token ' + GITHUB.token,
                },
                method: 'put',
                url: GITHUB.reqBaseUrl + title,
                data: JSON.stringify({
                    message: 'add image ' + createted_at,
                    content,
                }),
            });

            completion(null, res)

        } catch (error) {
            logger.error(error)
            completion(error, null)
        }

    }
}

module.exports = UploadController.shared()
