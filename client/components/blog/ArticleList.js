/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AOS from "aos"
import InfiniteScroll from '../InfiniteScroll'
import * as articles from '../../redux/features/articles'
import ArticleCard, { ArticleCardSkeleton } from './ArticleCard'
import { useUserId } from "../../api/auth"
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
    container: {
        boxSizing: "border-box",
        flexDirection: "column"
    },
    root: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        overflow: "hidden",
    },
    item: {
        margin: theme.spacing(2)
    }
}))

const ArticleList = () => {

    const classes = useStyles()
    const state = articles.useState()
    const dispatch = useDispatch()
    const userId = useUserId()
    const router = useRouter()

    const fetchState = () => dispatch(articles.fetchMore(state))
    const onLike = (data) => {
        if (userId) {
            dispatch(articles.update(data._id, { like_users: [userId] }))
        } else {
            router.push("/account/signin")
        }
    }

    useEffect(() => {

        fetchState()

        AOS.init({
            offset: 40,
            duration: 500,
            easing: 'ease-in-sine',
            delay: 10,
        })

    }, [])

    if (state.loading) return (
        <Box className={classes.root}>
            {Array.from({ length: 10 }).map((_, index) => (
                <Box key={`${index}`} data-aos={"fade-up"} style={{ padding: 10 }} >
                    <ArticleCardSkeleton />
                </Box>
            ))}
        </Box>
    )
    return (
        <InfiniteScroll
            dataLength={state.items.length}
            next={fetchState}
            hasMore={state.items.length < state.total}
            pullDownToRefresh
            refreshFunction={fetchState}
            loader={(
                <Box className={classes.root}>
                    <Box style={{ padding: 10 }} >
                        <ArticleCardSkeleton />
                    </Box>
                </Box>
            )}

        >
            <Box className={classes.root}>
                {state.items.map((article) => (
                    <Box key={article._id} data-aos={"fade-up"}>
                        <ArticleCard
                            data={article}
                            className={classes.item}
                            onLike={onLike}
                            isAuthor={article.author == userId}
                            isLike={article.like_users.filter((user) => user && user._id == userId)[0]}
                        />
                    </Box>
                ))}
            </Box>
        </InfiniteScroll>
    )
}

export default ArticleList