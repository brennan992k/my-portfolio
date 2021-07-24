import { Box, Button, LinearProgress, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useRef, useState } from 'react'
import * as api from "../../api/auth"
import Link from '../../components/Link'

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

const SignInForm = ({ className, onSignedIn = (data) => { }, onSignInError = (error) => { } }) => {

    const classes = useStyles()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const data = useRef({ email: "", password: "", }).current

    const onChangePassword = (e) => data.password = e.target.value
    const onSignInClick = () => {
        setLoading(true)
        api.signin(data, (error, data) => {
            setLoading(false)
            if (error) {
                setError(error)
                onSignInError(error)
            }
            if (data) onSignedIn(data)
        })
    }

    return (
        <form className={className}>
            {loading && <LinearProgress />}
            <Box className={classes.container}>
                <Box className={classes.section}>
                    <Typography variant={"h3"} className={classes.title} color={"primary"}>Reset Password</Typography>
                </Box>
                {error != null && (
                    <Box className={classes.section}>
                        <Typography color={"error"} variant="caption">{error}</Typography>
                    </Box>
                )}
                <Box className={classes.section}>
                    <TextField
                        id="password"
                        label="New password"
                        variant="outlined"
                        fullWidth
                        size={"small"}
                        onChange={onChangePassword}
                        type="password"
                    />
                </Box>
                <Box className={classes.section}>
                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        fullWidth
                        size="large"
                        onClick={onSignInClick}
                        disabled={loading}
                    >
                        RESET
                    </Button>
                </Box>
            </Box>
        </form>
    )
}

export default SignInForm