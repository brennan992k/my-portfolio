import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchArticle, useArticle } from '../../redux/features/article'

const ArticleDetail = ({ slug }) => {

    const state = useArticle()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchArticle(slug))
    }, [slug])

    return (
        <div dangerouslySetInnerHTML={{
            __html: state.item.content,
        }} />

    )
}

export default ArticleDetail