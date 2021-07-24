import { configureStore } from '@reduxjs/toolkit'
import _ from 'lodash'
import articles from './features/articles'
import article from './features/article'
import tags from './features/tags'
import categories from './features/categories'

const store = configureStore({
    reducer: {
        [articles.name]: articles.reducer,
        [article.name]: article.reducer,
        [tags.name]: tags.reducer,
        [categories.name]: categories.reducer
    }
})

export const getState = (name, completion = (data) => { }) => {
    const state = store.getState()
    if (!name) return state
    const data = state[name]
    _.isFunction(completion) && completion(data)
    return data
}

export default store