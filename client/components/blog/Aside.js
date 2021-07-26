import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import TagList from './TagList'
import CategoryList from './CategoryList'
import Note from './Note'
import WriteArticle from './WriteArticle'
import StickyBox from '../StickyBox'

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
            <StickyBox offsetTop={100} offsetBottom={0}>
                {/*==== Write Article ====*/}
                <WriteArticle />
                {/*==== Note ====*/}
                <Note />
                {/*==== Categories ===*/}
                <CategoryList />
                {/*==== Tags ====*/}
                <TagList />
            </StickyBox>

        </Box>
    )
}

export default Aside