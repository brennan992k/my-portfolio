import axios from '../lib/axios'
import _ from 'lodash'
import { tagURI } from './config';

export const fetchTags = async (params, completion) => {
    const response = await axios.get(tagURI.list, { params }, { withCredentials: true })
    if (response && response.status == 200) {
        const data = response.data
        const result = data?.data
        if (data.status == "success" && result) {
            _.isFunction(completion) && completion(result)
            return result
        }
    }
    _.isFunction(completion) && completion(null)
    return null
};

export const fetchTag = async (params, completion) => {
    const response = await axios.post(tagURI.detail, params, { withCredentials: true })
    if (response && response.status == 200) {
        const data = response.data
        const result = data?.data
        if (data.status == "success" && result) {
            _.isFunction(completion) && completion(result)
            return result
        }
    }
    _.isFunction(completion) && completion(null)
    return null
};

