import React, { useEffect } from 'react'
import ArticlePost, { ArticlePostSkeleton } from './ArticlePost'
import InfiniteScroll from '../InfiniteScroll'
import LoadMore from '../Process/LoadMore'
import { useArticles, fetchMoreArticles } from '../../redux/features/articles'
import { useDispatch } from 'react-redux'
import { Box, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AOS from "aos"


const useStyles = makeStyles((theme) => ({
    container: {
        boxSizing: "border-box",
    },
    root: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        overflow: "hidden",
    }
}))

export const ArticleInfiniteScrollSkeleton = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Grid container className={classes.container} spacing={2}>
                {Array.from({ length: 10 }).map((_, index) => (
                    <Grid key={`${index}`} item xs={12} sm={12} md={6} lg={4} className={classes.item} >
                        <Box height={"100%"} data-aos={"fade-up"} >
                            <ArticlePostSkeleton />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

const ArticleInfiniteScroll = () => {

    const classes = useStyles()
    const state = useArticles()
    const dispatch = useDispatch()

    const fetchState = () => dispatch(fetchMoreArticles(state))

    useEffect(() => {

        fetchState()

        AOS.init({
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 100,
        })

    }, [])

    if (state.loading)
        return <ArticleInfiniteScrollSkeleton classes={classes} />

    return (
        <InfiniteScroll
            dataLength={state.items.length}
            next={fetchState}
            hasMore={state.items.length < state.total}
            loader={<LoadMore />}
            pullDownToRefresh
            refreshFunction={fetchState}
        >
            <div className={classes.root}>
                <Grid container className={classes.container} spacing={2}>
                    {state.items.map((article) => (
                        <Grid key={`${article._id}`} item xs={12} sm={12} md={6} lg={4} className={classes.item} >
                            <Box height={"100%"} data-aos={"fade-up"} >
                                <ArticlePost data={article} />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </InfiniteScroll>
    )
}

export default ArticleInfiniteScroll