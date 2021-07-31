/* eslint-disable react-hooks/exhaustive-deps */
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../../api/article';

/*==== Initial ====*/

const initialState = {
    item: {},
    loading: true,
    cache: {},
};

const slice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload
            return state
        },
        setData(state, action) {
            const { item } = action.payload;
            state.item = item
            return state
        },
        setCache(state, action) {
            const { item } = action.payload
            state.cache[item.slug] = {
                item
            }
            return state
        },
        setState(state, action) {
            const { item } = action.payload
            state.item = item
            state.cache[item.slug] = {
                item
            }
            return state
        },
        update(state, action) {
            state.item = { ...state.item, ...action.payload }
            return state
        }
    },
});

/*==== Action ====*/

export const useState = (props = ["item", "loading"]) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const state = useSelector((state) => {
        return _.pick(state[slice.name], props)
    })

    useEffect(() => {
        if (_.has(router.query, "slug")) {
            dispatch(fetch(router.query.slug, state))
        }
    }, [router])

    return state
}

export const getState = (store) => {
    const value = store.getState()
    return value?.[slice.name]
}

export const { setLoading, setData, setCache, setState, update } = slice.actions

/**
 * 
 * @param {String} slug 
 * @param {Object} currentState 
 * @returns 
 */
export const fetch = (slug, currentState) => async (dispatch) => {
    if (!currentState.loading) await dispatch(setLoading(true))
    await api.fetchArticle({ slug }, (response) => {
        if (response) {
            dispatch(setState({ item: response }))
        } else {
            const cacheKey = slug
            if (currentState && _.has(currentState.cache, cacheKey)) {
                const dataCache = currentState.cache[cacheKey]
                dispatch(setState(dataCache))
            }
        }
    });
    if (currentState.loading) dispatch(setLoading(false))
};


export default slice
