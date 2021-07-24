import React, { Fragment } from 'react'
import Layout from '../../client/components/Layout'
import ArticleInfiniteScroll from '../../client/components/Article/ArticleInfiniteScroll'
import PopularTags from '../../client/components/Tag/PopularTags'

const Page = () => {
    const right = (
        <Fragment>
            <PopularTags />
        </Fragment>
    )
    return (
        <Layout right={right}>
            <ArticleInfiniteScroll />
        </Layout>
    )
}

export default Page