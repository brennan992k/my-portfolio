import React from 'react'
import ArticleDetail from '../../client/components/blog/ArticleDetail'
import Layout from '../../client/components/layout/Layout'

const Page = (props) => (
    <Layout {...props}>
        <ArticleDetail />
    </Layout>
)

export default Page