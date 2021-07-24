import _ from 'lodash'
import { articleURI } from './config';
import axios from '../lib/axios'

export const fetchArticles = async (params, completion) => {
    const response = await axios.get(articleURI.list, { params }, { withCredentials: true })
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

export const fetchArticle = async (params, completion) => {
    const response = await axios.post(articleURI.detail, params, { withCredentials: true })
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

export const createArticle = async (data, completion) => {
    const response = await axios.post(articleURI.add, data, { withCredentials: true })
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
}

export const likeArticle = async (params, completion) => {
    // const response = await axios.post("/api/v1/article/detail", params, { withCredentials: true })
    // if (response && response.status == 200) {
    //     const data = response.data
    //     const result = data?.data
    //     if (data.status == "success" && result) {
    //         _.isFunction(completion) && completion(result)
    //         return result
    //     }
    // }
    // _.isFunction(completion) && completion(null)
    // return null
};
