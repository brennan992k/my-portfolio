import React from 'react'
import { Grid } from '@material-ui/core'
import Layout from '../../client/components/layout/Layout'
import ArticleEditor from '../../client/components/blog/ArticleEditor'

const Page = (props) => (
    <Layout {...props}>
        <Grid container >
            <Grid item xs={12} sm={8} md={9} xl={8} >
                <ArticleEditor />
            </Grid>
            <Grid item xs={12} sm={4} md={3} xl={4}>

            </Grid>
        </Grid>
    </Layout>

)

export default Page