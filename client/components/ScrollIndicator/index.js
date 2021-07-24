import React, { Fragment } from 'react'
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    "scrollDowns": {
        position: "absolute",
        bottom: "20px",
        margin: "auto",
        width: "34px",
        height: "55px",
    },
    "mousey": {
        width: "3px",
        padding: "10px 15px",
        height: "35px",
        border: "2px solid #fff",
        borderRadius: "25px",
        opacity: 0.75,
        boxSizing: "content-box",
    },
    "scroller": {
        width: "3px",
        height: "10px",
        borderRadius: "25%",
        backgroundColor: "#fff",
        animation: `$scroll 3000ms ${theme.transitions.easing.easeInOut} infinite`
    },
    "@keyframes scroll": {
        "0%": {
            opacity: 0,
        },
        "10%": {
            transform: "translateY(0)", opacity: 1,
        },
        "100%": {
            transform: "translateY(15px)", opacity: 0,
        }
    }
}))

const ScrollIndicator = () => {
    const classes = useStyles()
    return (
        <div className={classes.scrollDowns}>
            <div className={classes.mousey}>
                <div className={classes.scroller} />
            </div>
        </div>
    )
}

export default ScrollIndicator