/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, ListItemIcon, ListItemText, Checkbox, List, ListItem } from '@material-ui/core'
import { Skeleton } from "@material-ui/lab"
import { useDispatch } from "react-redux"
import Section from "../Section"
import * as categories from "../../redux/features/categories"
import * as articles from "../../redux/features/articles"
import store from "../../redux/store"
import Selection from '../Selection'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}))


const CategoryListSkeleton = ({ className }) => {
    const classes = useStyles()
    return (
        <Section className={className}>
            <Typography >Categories</Typography>
            <List className={classes.root}>
                <Selection
                    data={[{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }, { key: 5 }]}
                    fieldCheck={"key"}
                    renderItem={({ item }) => <Skeleton id={item.key} variant="text" width={"80%"} height={30} />}
                />
            </List>
        </Section>
    )
}

const CategoryList = ({ className }) => {

    const classes = useStyles()
    const state = categories.useState()
    const dispatch = useDispatch()
    const onChange = async (selections) => {
        const currentState = articles.getState(store)
        const params = { ...currentState.params, page: 0, cid: selections.join(",") }
        dispatch(articles.fetchMore({ ...currentState, params }))
    }

    useEffect(() => {
        dispatch(categories.fetchMore(state))
    }, [])

    if (state.loading) return <CategoryListSkeleton />

    return (
        <Section className={className}>
            <Typography >Categories</Typography>
            <List className={classes.root}>
                <Selection
                    data={state.items}
                    fieldCheck={"_id"}
                    onChange={onChange}
                    renderItem={({ item, onClick, isSelected }) => (
                        <ListItem role={undefined} dense button onClick={onClick}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={isSelected}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': item._id }}
                                />
                            </ListItemIcon>
                            <ListItemText id={item._id} primary={item.name} />
                        </ListItem>
                    )}
                />
            </List>
        </Section>
    )


}

export default CategoryList