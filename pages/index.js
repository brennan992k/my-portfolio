/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DisplacementSphere from '../client/components/DisplacementSphere'
import DencryptText from '../client/components/DencryptText'
import TypingText from '../client/components/TypingText'
import ScrollIndicator from '../client/components/ScrollIndicator'
import Link from "../client/components/Link"

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw"
    },
    intro: {
        color: "#fff",
        minWidth: 500,
        padding: theme.spacing(2),
        wordWrap: "wrap"
    },
    introName: {
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
            <DisplacementSphere theme={{ rgbBackground: "175 150 200" }} />
            <Grid item >
                <Typography variant={"h3"} className={`${classes.intro} ${classes.introName}`}>
                    Hi! My name's {" "}
                    <DencryptText
                        component={"span"}
                        variant="h1"
                        text={"Brennan Ngo"}
                    />
                </Typography>
                <TypingText
                    component={"span"}
                    variant={"h3"}
                    className={classes.intro}
                    items={[
                        "I'm a photographer",
                        "and",
                        "a designer",
                        "all the more",
                        "I'm a developer"
                    ]}
                />
            </Grid>
            <Link href={"/blog"}>
                <Box className={classes.cursorContainer}>
                    <Typography className={classes.click}>
                        Click
                    </Typography>
                    <ScrollIndicator />
                </Box>
            </Link>
        </Grid>
    )
}

export default Home