import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    container:{
        margin: "150px auto 0", 
        padding: 0, 
        width: "100px",
        textAlign: "center",
    },
    root: {
        color: "red",
        textTransform: "uppercase",
        textDecoration: "none",
        letterSpacing: "0.15em",
        display: "inline-block",
        position: "relative",
        "&:after": {
            content: "okiooooooo",
            height: 4,
            backgroundColor: "red",
            width: 100,
        },
        "&:hover :after": {
            width: "100%",
            left: 0,
        }
    }
}))

const UnderlineText = ({ className, ...props }) => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <a className={classes.root}>
                Hello
            </a>
        </div>

    )
}

export default UnderlineText