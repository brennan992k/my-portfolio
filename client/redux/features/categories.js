import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import * as api from '../../api/category'
import _ from "lodash"

/*==== Initial ====*/
const initialValue = {
    total: 0,
    items: [],
    params: {
        limit: 10,
        page: 0,
        key: ""
    },
}

const initialState = {
    ...initialValue,
    cache: {}
}

const categories = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories(state, action) {
            const { items, total, params } = action.payload
            state.items = items
            state.total = total
            state.params = params
        },
        setDataInCache(state, action) {
            const { items, total, params } = action.payload
            state.items = items
            state.total = total
            state.params = params
            const cacheKey = getCategoriesCacheKey(params)
            state.cache[cacheKey] = {
                items,
                total,
                params
            }
        },
    }
})

/*==== Helper ====*/
export const getCategoriesCacheKey = ({ page = 0, limit = 10, key = "" }) => {
    const arr = [page, limit, key]
    return arr.join("#")
};


/*==== Action ====*/
export const useCategories = () => {
    return useSelector((state) => state[categories.name])
}

/**
 * 
 * @param {object} state --Current state
 * @returns 
 */
export const fetchMoreCategories = (state) => (dispatch) => {
    const { page, ...rest } = state.params
    const newParams = { page: page + 1, ...rest }
    api.fetchCategories(newParams, (response) => {
        if (response) {
            const { docs, total_docs } = response
            dispatch(categories.actions.setDataInCache({
                ...state,
                items: state.items.concat(docs),
                total: total_docs,
                params: newParams
            }))
        } else {
            const cacheKey = getCategoriesCacheKey(newParams)
            if (_.has(state.cache, cacheKey)) {
                const dataCache = state.cache[cacheKey]
                dispatch(categories.actions.setCategories({
                    ...state,
                    ...dataCache
                }))
            }
        }
    })
}

export const setCategories = (newValue) => {
    //refresh
    if (!newValue ||_.isEqual(newValue, initialValue)) {
        return fetchMoreCategories(initialState)
    }
    return categories.actions.setDataInCache(newValue)
}

export default categories