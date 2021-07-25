import React from 'react'
import { Container, Grid } from '@material-ui/core'
import ArticleList from '../../client/components/blog/ArticleList'
import Aside from '../../client/components/blog/Aside'

const Page = () => (
    <Container maxWidth={"lg"}>
        <Grid container >
            <Grid item xs={12} sm={8} md={9} xl={8} >
                <ArticleList />
            </Grid>
            <Grid item xs={12} sm={4} md={3} xl={4}>
                <Aside />
            </Grid>
        </Grid>
    </Container>

)

export default Page