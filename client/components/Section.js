import React from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 10,
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.01)",
        "&:hover": {
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        }
    }
}))

const Section = (props) => {
    const classes = useStyles()
    return <Box {...props} className={classes.root} />
}

export default Section