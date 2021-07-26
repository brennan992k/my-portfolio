import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { NotificationsActive as NotificationsActiveIcon } from "@material-ui/icons"
import MarQueeText from "../MarQueeText"
import Section from "../Section"
import Flash from "../Flash"
import { Typography } from "@material-ui/core"

const useStyles = makeStyles(() => ({
    root: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap:"nowrap"
    },

}))

const Note = (props) => {
    const classes = useStyles()
    return (
        <Section className={classes.root} {...props}>
            <Flash>
                <NotificationsActiveIcon />
            </Flash>
            <Typography>
                hooooo o o o o o o o
            </Typography>
        </Section>
    )
}

export default Note