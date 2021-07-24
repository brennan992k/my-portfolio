import axios from 'axios'
import _ from 'lodash'
import { useRef, useState } from 'react';

const showStatus = (status) => {
    let message = ''
    switch (status) {
        case 400:
            message = 'Request error (400)'
            break
        case 401:
            message = 'Unauthorized, please log in again (401)'
            break
        case 403:
            message = 'Access denied (403)'
            break
        case 404:
            message = 'Request error (404)'
            break
        case 408:
            message = 'Request timed out (408)'
            break
        case 500:
            message = 'Server error (500)'
            break
        case 501:
            message = 'Service not implemented (501)'
            break
        case 502:
            message = 'Network error (502)'
            break
        case 503:
            message = 'Service unavailable (503)'
            break
        case 504:
            message = 'Network timeout (504)'
            break
        case 505:
            message = 'HTTP version is not supported (505)'
            break
        default:
            message = `Connection error (${status})!`
    }
    return `${message}, please check the network or contact the administrator! `
}
    ;
const service = axios.create({
    headers: {
        get: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        post: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    },
    withCredentials: false,
    timeout: 30000,
    transformRequest: [(data) => {
        data = JSON.stringify(data)
        return data
    }],
    validateStatus() {
        return true
    },
    transformResponse: [(data) => {
        if (typeof data === 'string' && data.startsWith('{')) {
            data = JSON.parse(data)
        }
        return data
    }]
})

service.interceptors.request.use((config) => {
    return config
}, (error) => {
    error.data = {}
    error.data.msg = 'The server is abnormal, please contact the administrator!'
    return Promise.resolve(error)
})

service.interceptors.response.use((response) => {
    const status = response.status
    let msg = ''
    if (status < 200 || status >= 300) {
        msg = showStatus(status)
        if (typeof response.data === 'string') {
            response.data = { msg }
        } else {
            response.data.msg = msg
        }
    }
    return response
}, (error) => {
    error.data = {}
    error.data.msg = 'Request timeout or server abnormality, please check the network or contact the administrator!'
    return Promise.resolve(error)
})

export const useResponse = (request = () => { }, defaultData) => {

    const [loading, setLoading] = useState(false)
    const error = useRef(null)
    const data = useRef(defaultData)

    const sendRequest = async () => {
        await setLoading(true)

        if (_.isFunction(request)) {
            const res = await request()
            data.current = res?.data?.data
            error.current = res?.data?.error
            error.current = !error.current && !data.current ? "Server error" : error.current
        }

        setLoading(false)
    }

    return {
        error: error.current,
        data: data.current,
        loading,
        sendRequest
    }
}

export default service