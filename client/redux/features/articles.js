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

export const initialState = {
    total: 0,
    items: [],
    params: initialParams,
    loading: false,
    cache: {}
}

const slice = createSlice({
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
        setData(state, action) {
            const { items, total } = action.payload
            state.items = items
            state.total = total
            return state
        },
        setCache(state, action) {
            const { items, total, params } = action.payload
            const cacheKey = getCacheKey(params)
            state.cache[cacheKey] = {
                items,
                total,
                params
            }
            return state
        },
        setState(state, action) {
            const { items, total, params } = action.payload
            const cacheKey = getCacheKey(params)
            state.params = { ...state.params, ...params }
            state.items = items
            state.total = total
            state.cache[cacheKey] = {
                items,
                total,
                params
            }
            return state
        }
    }
})

/*==== Helper ====*/
export const getCacheKey = ({ page, limit, cid, tid, key } = initialParams) => {
    const arr = [page, limit, cid, tid, key]
    return arr.join("#")
};


/*==== Action ====*/
export const useState = (props = ["items", "total", "loading", "params"]) => {
    return useSelector((state) => {
        return _.pick(state[slice.name], props)
    })
}

export const getState = (store) => {
    const value = store.getState()
    return value?.[slice.name]
}

export const { setLoading, setParams, setData, setCache, setState } = slice.actions

/**
 * 
 * @param {object} currentState --Current state
 * @returns 
 */
export const fetchMore = (currentState) => async (dispatch) => {
    const { params, items, cache, loading } = currentState
    if (params.page <= 0 && !loading) await dispatch(setLoading(true))
    // Create new params for new request from current params
    const newParams = { ...params, page: params.page + 1 }
    await api.fetchArticles(newParams, (response) => {
        if (response) {
            const { docs, total_docs } = response
            const data = {
                items: params.page <= 0 ? docs : items.concat(docs),
                total: total_docs,
                params: newParams
            }
            dispatch(setState(data))
        } else {
            const cacheKey = getCacheKey(newParams)
            if (_.has(cache, cacheKey)) {
                const dataCache = cache[cacheKey]
                dispatch(setState(dataCache))
            }
        }
    })
    if (params.page <= 0) await dispatch(setLoading(false))
}

export default slice