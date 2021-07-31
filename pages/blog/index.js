import React from 'react'
import { Grid } from '@material-ui/core'
import ArticleList from '../../client/components/blog/ArticleList'
import Aside from '../../client/components/blog/Aside'

import Layout from '../../client/components/layout/Layout'

const Page = (props) => (
    <Layout {...props}>
        <Grid container >
            <Grid item xs={12} sm={8} md={9} xl={8} >
                <ArticleList />
            </Grid>
            <Grid item xs={12} sm={4} md={3} xl={4}>
                <Aside />
            </Grid>
        </Grid>
    </Layout>

)

export default Page