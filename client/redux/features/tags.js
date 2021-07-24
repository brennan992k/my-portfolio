import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import * as api from '../../api/tag'
import _ from "lodash"

/*==== Initial ====*/
export const initialParams = {
    limit: 100,
    page: 0,
    key: ""
}
export const initialValue = {
    total: 0,
    items: [],
    params: initialParams,
}

export const initialState = {
    ...initialValue,
    cache: {}
}

const tags = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        setTags(state, action) {
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
            const cacheKey = getTagsCacheKey(params)
            state.cache[cacheKey] = {
                items,
                total,
                params
            }
        },
    }
})

/*==== Helper ====*/
export const getTagsCacheKey = ({ page, limit, key } = initialParams) => {
    const arr = [page, limit, key]
    return arr.join("#")
};


/*==== Action ====*/
export const useTags = () => {
    return useSelector((state) => state[tags.name])
}

/**
 * 
 * @param {object} currentState --Current state
 * @returns 
 */
export const fetchMoreTags = (currentState) => (dispatch) => {
    const { page, ...rest } = currentState.params
    const newParams = { page: page + 1, ...rest }
    api.fetchTags(newParams, (response) => {
        if (response) {
            const { docs, total_docs } = response
            dispatch(tags.actions.setDataInCache({
                ...currentState,
                items: currentState.items.concat(docs),
                total: total_docs,
                params: newParams
            }))
        } else {
            const cacheKey = getTagsCacheKey(newParams)
            if (_.has(currentState.cache, cacheKey)) {
                const dataCache = currentState.cache[cacheKey]
                dispatch(tags.actions.setTags({
                    ...currentState,
                    ...dataCache
                }))
            }
        }
    })
}

export default tags