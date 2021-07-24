import { Box, Button, LinearProgress, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useRef, useState } from 'react'
import * as api from "../../api/auth"
import Link from '../../components/Link'

const useStyles = makeStyles((theme) => ({
    section: {
        padding: theme.spacing(1)
    },
    container: {
        padding: theme.spacing(1)
    },
    title: {
        fontWeight: 600
    }
}))

const ForgotForm = ({ className, onSignedIn = (data) => { }, onSignInError = (error) => { } }) => {

    const classes = useStyles()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const data = useRef({ email: "" }).current

    const onChangeMail = (e) => data.email = e.target.value
    const onSignInClick = () => {
        setLoading(true)
        api.forgotPassword(data, (error, data) => {
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
                <Box className={classes.section} >
                    <Typography variant={"h3"} className={classes.title} color={"primary"}>Reset Password</Typography>
                    <Typography variant={"caption"} >Enter your email address below and we will send you a link to reset your password.</Typography>
                </Box>
                {error != null && (
                    <Box className={classes.section}>
                        <Typography color={"error"} variant="caption">{error}</Typography>
                    </Box>
                )}
                <Box className={classes.section}>
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        size={"small"}
                        type={"email"}
                        onChange={onChangeMail}
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
                        Send
                    </Button>
                </Box>
                <Box className={classes.section} display={"flex"} justifyContent="center">
                    <Typography variant={"caption"} >
                        <Link href="/auth/signin">
                            <Typography variant={"caption"} component={"span"} color={"primary"} >
                                Sign In
                            </Typography>
                        </Link>
                        {" "}or{" "}
                        <Link href="/auth/signup">
                            <Typography variant={"caption"} component={"span"} color={"primary"} >
                                Sign Up
                            </Typography>
                        </Link>
                    </Typography>
                </Box>
            </Box>

        </form>
    )
}

export default ForgotForm