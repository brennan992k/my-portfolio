import React, { Fragment } from 'react'
import { Container, Grid, Toolbar } from '@material-ui/core'
import ArticleList from '../../client/components/blog/ArticleList'
import Aside from '../../client/components/blog/Aside'
import Header from '../../client/components/layout/Header'
import MyHead from '../../client/components/layout/MyHead'
import BackTop from '../../client/components/BackTop'

const Page = (props) => (
    <Fragment>
        <MyHead />
        <Header />
        <Toolbar id="back-to-top-anchor" />
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
        <BackTop {...props} anchor={"#back-to-top-anchor"} />
    </Fragment>
)

export default Page