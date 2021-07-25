/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DisplacementSphere from '../client/components/DisplacementSphere'
import DencryptText from '../client/components/DencryptText'
import TypingText from '../client/components/TypingText'
import ScrollCursor from '../client/components/ScrollCursor'
import Link from "../client/components/Link"

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw"
    },
    intro: {
        minWidth: "60vw",
        padding: theme.spacing(2),
        wordWrap: "wrap",
        textTransform: "uppercase",
        fontSize: "calc((24 / 16) * 1rem)",
        letterSpacing: "0.3em",
        lineHeight: 1,
    },
    cursorContainer: {
        position: "absolute",
        bottom: 0,
    },
    click: {
        position: "absolute",
        color: "#fff",
        bottom: 80
    }
}))

const Home = () => {
    const classes = useStyles()

    return (
        <Grid container className={classes.root}>
            <DisplacementSphere theme={{ rgbBackground: "250 250 250" }} />
            <Grid item >
                <Typography variant={"h3"} className={`${classes.intro} ${classes.introName}`}>
                    Hey, I'm {" "}
                    <DencryptText
                        component={"span"}
                        variant="h1"
                        text={"Brennan Ngo"}
                    />
                </Typography>
                <Typography variant={"h3"} className={`${classes.intro} ${classes.introName}`}>
                    A
                    <TypingText
                        component={"span"}
                        variant={"h3"}
                        className={classes.intro}
                        items={[
                            "photographer",
                            "designer",
                            "developer",
                        ]}
                        cursor
                    />
                </Typography>
            </Grid>
            <Link href={"/blog"} className={classes.cursorContainer}>
                <Typography className={classes.click}>
                    Click
                </Typography>
                <ScrollCursor />
            </Link>
        </Grid>
    )
}

export default Home