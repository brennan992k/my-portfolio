import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import * as api from '../../api/article'
import _ from "lodash"

/*==== Initial ====*/
export const initialParams = {
    limit: 10,
    page: 0,
    tid: "",
    cid: "",
    key: ""
}

export const initialValue = {
    total: 0,
    items: [],
    params: initialParams,
}

export const initialState = {
    ...initialValue,
    cache: {},
    loading: true,
}

const articles = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload
            return state
        },
        setParams(state, action) {
            state.params = { ...state.params, ...action.payload }
            return state
        },
        setArticles(state, action) {
            const { items, total, params } = action.payload
            state.items = items
            state.total = total
            state.params = params
            state.loading = false
            return state
        },
        setDataInCache(state, action) {
            const { items, total, params } = action.payload
            state.items = items
            state.total = total
            state.params = params
            state.loading = false
            const cacheKey = getArticlesCacheKey(params)
            state.cache[cacheKey] = {
                items,
                total,
                params
            }
            return state
        },
    }
})

/*==== Helper ====*/
export const getArticlesCacheKey = ({ page, limit, cid, tid, key } = initialParams) => {
    const arr = [page, limit, cid, tid, key]
    return arr.join("#")
};


/*==== Action ====*/
export const useArticles = () => {
    return useSelector((state) => state[articles.name])
}

/**
 * 
 * @param {object} currentState --Current state
 * @returns 
 */
export const fetchMoreArticles = (currentState) => async (dispatch) => {
    const { page, ...rest } = currentState.params
    const newParams = { page: page + 1, ...rest }
    await api.fetchArticles(newParams, (response) => {
        if (response) {
            const { docs, total_docs } = response
            dispatch(articles.actions.setDataInCache({
                ...currentState,
                items: currentState.items.concat(docs),
                total: total_docs,
                params: newParams
            }))
        } else {
            const cacheKey = getArticlesCacheKey(newParams)
            if (_.has(currentState.cache, cacheKey)) {
                const dataCache = currentState.cache[cacheKey]
                dispatch(articles.actions.setArticles({
                    ...currentState,
                    ...dataCache
                }))
            }
        }
    })
}

export const { setLoading, setParams } = articles.actions

export const getArticles = (store) => {
    const value = store.getState()
    return value?.[articles.name]
}

export default articles