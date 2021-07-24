import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import * as api from '../../api/article';

/*==== Initial ====*/
const initialValue = {
    item: {},
}

const initialState = {
    ...initialValue,
    cache: {},
};

const article = createSlice({
    name: 'article',
    initialState,
    reducers: {
        setArticle(state, action) {
            const { item } = action.payload;
            state.item = item
            state.loading = false
        },
        setDataInCache(state, action) {
            const { item } = action.payload
            state.item = item
            state.loading = false
            state.cache[item.slug] = {
                item
            }
        },
    },
});

/*==== Action ====*/
export const fetchArticle = (slug) => async (dispatch) => {
    api.fetchArticle({ slug }, (response) => {
        if (response) {
            dispatch(article.actions.setDataInCache({ item: response }))
        } else {
            const cacheKey = slug
            if (_.has(state.cache, cacheKey)) {
                const dataCache = state.cache[cacheKey]
                dispatch(article.actions.setArticle({
                    ...state,
                    ...dataCache
                }))
            }
        }
    });
};

export const useArticle = () => {
    return useSelector((state) => state[article.name])
}

export default article;
