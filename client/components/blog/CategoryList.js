import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Box, Button, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useCategories, fetchMoreCategories } from "../../redux/features/categories"
import { setLoading, fetchMoreArticles, getArticles, setParams } from "../../redux/features/articles"
import Section from "../Section"
import store from "../../redux/store"

const useStyles = makeStyles((theme) => ({
    content: {
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    item: {
        cursor: "pointer"
    }
}))

const CategoryList = () => {

    const classes = useStyles()
    const state = useCategories()
    const dispatch = useDispatch()
    const onFetchArticle = async (cid) => {
        await dispatch(setLoading(true))
        await dispatch(setParams({ cid, page: 0 }))
        const currentState = getArticles(store)
        await dispatch(fetchMoreArticles(currentState))
        await dispatch(setLoading(false))
    }

    useEffect(() => {
        dispatch(fetchMoreCategories(state))
    }, [])

    return (
        <Section>
            <Typography >Categories</Typography>
            <Box component={"ul"} className={classes.content}>
                {
                    state.items.map((item) => (
                        <li key={item._id} className={classes.item}>
                            <Typography onClick={() => onFetchArticle(item._id)} style={{ textTransform: 'none' }}>
                                {item.name}
                            </Typography>
                        </li>

                    ))
                }
            </Box>

        </Section>
    )


}

export default CategoryList