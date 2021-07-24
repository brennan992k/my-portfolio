import { Box, Typography } from "@material-ui/core"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import * as tags from "../../redux/features/tags"
import * as articles from "../../redux/features/articles"
import ChipSelection from "../Selection/ChipSelection"

const PopularTags = () => {

    const state = tags.useTags()
    const dispatch = useDispatch()

    const fechState = () => dispatch(tags.fetchMoreTags(tags.initialState))

    useEffect(() => {
        fechState()
    }, [])

    const onChange = async (value) => {
        if (value[0]) {
            const newState = {
                ...articles.initialState,
                params: {
                    ...articles.initialState.params,
                    tid: value[0]
                }
            }
            await dispatch(articles.setLoading(true))
            await dispatch(articles.fetchMoreArticles(newState))
            await dispatch(articles.setLoading(false))
        }
    }

    return (
        <Box>
            <Typography >Popular Tags</Typography>
            <ChipSelection
                data={state.items}
                fieldCheck={"_id"}
                fieldLabel={"name"}
                onChange={onChange}
                mutilable={false}
            />
        </Box>

    )
}

export default PopularTags