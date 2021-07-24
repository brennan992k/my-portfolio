import axios from '../lib/axios'
import _ from 'lodash'
import { categoryURI } from './config';

export const fetchCategories = async (params, completion) => {
    const response = await axios.get(categoryURI.list, { params }, { withCredentials: true })
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

export const fetcCategory = async (params, completion) => {
    const response = await axios.post(categoryURI.detail, params, { withCredentials: true })
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

