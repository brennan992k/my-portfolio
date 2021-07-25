import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import TagList from './TagList'
import CategoryList from './CategoryList'
import Note from './Note'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    },
    section: {

    }
}))

const Aside = () => {
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            {/*==== Note ====*/}
            <Note />
            {/*==== Categories ===*/}
            <CategoryList />
            {/*==== Tags ====*/}
            <TagList />
        </Box>
    )
}

export default Aside