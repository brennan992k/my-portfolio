import { Box, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useRef, useState } from 'react'
import { useSignup } from '../../api/auth'

const useStyles = makeStyles((theme) => ({
    section: {
        padding: theme.spacing(1),
    },
    container: {
        padding: theme.spacing(1)
    },
    title: {
        fontWeight: 600
    }
}))

const ActiveForm = ({ className }) => {

    const classes = useStyles()
    const { data, error, loading, sendRequest } = useSignup()

    return (
        <form className={className}>
            <Box className={classes.container}>
                <Box className={classes.section}>
                    <Typography variant={"h3"} className={classes.title} color={"primary"}>Reset Password</Typography>
                </Box>
                <Box className={classes.section}>
                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        fullWidth
                        size="large"
                        onClick={sendRequest}
                    >
                        GO
                    </Button>
                </Box>
            </Box>
        </form>
    )
}

export default ActiveForm