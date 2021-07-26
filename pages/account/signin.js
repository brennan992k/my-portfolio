import React from 'react'
import { Grid, Hidden, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SignInForm from '../../client/components/account/SignInForm'

const useStyles = makeStyles((theme) => ({
    left: {
        backgroundColor: theme.palette.primary.main
    },
    right: {
        justifyContent: "center",
        alignItems: "center"
    }
}))

const Page = () => {

    const classes = useStyles()

    return (
        <Grid
            container
            spacing={0}
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={10} sm={8} md={8} lg={6} >
                <Paper>
                    <Grid container spacing={0} >
                        <Hidden mdDown>
                            <Grid item xs={10} sm={false} md={12} lg={6} className={classes.left}>
                            </Grid>
                        </Hidden>
                        <Grid item xs={12} sm={12} md={12} lg={6} className={classes.right}>
                            <SignInForm />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Page