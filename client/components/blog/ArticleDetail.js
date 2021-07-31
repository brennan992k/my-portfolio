import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Section from "../Section"
import Image from "../Image"
import * as article from "../../redux/features/article"
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles(() => ({
    root: {

    },
    header: {
        maxHeight: 200
    }
}))

const ArticleDetailSkeleton = () => (
    <Grid container >
        <Grid item xs={12} sm={8} md={9} xl={8} >
            <Section>
                <Skeleton variant="rect" width={"100%"} height={600} />
            </Section>
        </Grid>
        <Grid item xs={12} sm={4} md={3} xl={4}>
            <Section>
                <Skeleton variant="rect" width={"100%"} height={60} />
            </Section>
        </Grid>
    </Grid>
)

const ArticleDetail = () => {

    const state = article.useState()
    const classes = useStyles()

    if (state.loading) return <ArticleDetailSkeleton />

    return (
        <Grid container >
            <Grid item xs={12} sm={8} md={9} xl={8} >
                <Section>
                    <div dangerouslySetInnerHTML={{ __html: state.item.content }}></div>
                </Section>
            </Grid>
            <Grid item xs={12} sm={4} md={3} xl={4}>
            </Grid>
        </Grid>
    )
}

export default ArticleDetail