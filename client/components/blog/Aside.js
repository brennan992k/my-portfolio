import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import TagList from './TagList'
import CategoryList from './CategoryList'
import Note from './Note'
import WriteArticle from './WriteArticle'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    },
    section: {
        margin: theme.spacing(2)
    }
}))

const Aside = () => {
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            {/*==== Write Article ====*/}
            <WriteArticle className={classes.section} />
            {/*==== Note ====*/}
            <Note className={classes.section} />
            {/*==== Categories ===*/}
            <CategoryList className={classes.section} />
            {/*==== Tags ====*/}
            <TagList className={classes.section} />
        </Box>
    )
}

export default Aside