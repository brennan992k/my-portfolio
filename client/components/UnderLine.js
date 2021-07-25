import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        '&:after': {
            content: '""',
            position: "absolute",
            backgroundColor: theme.palette.primary.main,
            height: "0.1rem",
            width: 0,
            left: "50%",
            transition: "width 0.5s"
        },
        '&:hover:after': {
            width: "100%",
            left:0
        }

    }
}))

const UnderlineText = ({ className, ...props }) => {
    const classes = useStyles()
    return (
        <Typography className={`${classes.root}`} {...props} />
    )
}

export default UnderlineText