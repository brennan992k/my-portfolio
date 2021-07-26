/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Button, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { LocalOffer as LocalOfferIcon } from "@material-ui/icons"
import Section from "../Section"
import * as tags from "../../redux/features/tags"
import * as articles from "../../redux/features/articles"
import store from "../../redux/store"
import Selection from "../Selection"

const useStyles = makeStyles(() => ({
    container: {
        flexWrap: "wrap",
        flexDirection: "row"
    }
}))

const TagList = ({ className }) => {

    const classes = useStyles()
    const state = tags.useState()
    const dispatch = useDispatch()
    const onChange = async (selections) => {
        const currentState = articles.getState(store)
        const params = { ...currentState.params, page: 0, tid: selections.join(",") }
        dispatch(articles.fetchMore({ ...currentState, params }))
    }

    useEffect(() => {
        dispatch(tags.fetchMore(state))
    }, [])

    return (
        <Section className={className}>
            <Typography ><LocalOfferIcon /> Tags</Typography>
            <Selection
                className={classes.container}
                data={state.items}
                fieldCheck={"_id"}
                onChange={onChange}
                renderItem={({ item, onClick, isSelected }) => (
                    <Button
                        key={item._id}
                        onClick={onClick}
                        variant={isSelected ? "outlined" : 'text'}
                        color="primary"
                    >
                        <Typography
                            component={"span"}
                            style={{ color: `rgb(${Math.floor(Math.random() * 201)}, ${Math.floor(Math.random() * 201)}, ${Math.floor(Math.random() * 201)} )`, }}
                        >
                            {item.name}
                        </Typography>
                    </Button>

                )}
            />
        </Section>
    )


}

export default TagList