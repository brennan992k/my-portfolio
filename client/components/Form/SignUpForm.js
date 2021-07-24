import { Backdrop, Box, Button, LinearProgress, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useRef, useState } from 'react'
import { usePreSignup } from "../../api/auth"
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
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

const SignInForm = ({ className, onSignedIn = (params) => { }, onSignInError = (error) => { } }) => {

    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const params = useRef({ name: "", email: "", password: "" }).current
    const { error, loading, sendRequest } = usePreSignup(params)
    const onChangeName = (e) => params.name = e.target.value
    const onChangeMail = (e) => params.email = e.target.value
    const onChangePassword = (e) => params.password = e.target.value
    const handleClose = () => setOpen(false);
    const handleToggle = () => setOpen(!open);

    return (
        <form className={className}>
            {loading && <LinearProgress />}
            <Box className={classes.container}>
                <Box className={classes.section}>
                    <Typography variant={"h3"} className={classes.title} color={"primary"}>Sign up</Typography>
                    <Typography variant={"caption"} >Wellcome to your world !</Typography>
                </Box>
                {error != null && (
                    <Box className={classes.section}>
                        <Typography color={"error"} variant="caption">{error}</Typography>
                    </Box>
                )}

                <Box className={classes.section}>
                    <TextField
                        id="name"
                        label="Your name"
                        variant="outlined"
                        fullWidth
                        size={"small"}
                        onChange={onChangeName}
                    />
                </Box>
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
                    <TextField
                        id="password"
                        label="Password"
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
                        onClick={sendRequest}
                        disabled={loading}
                    >
                        CREATE ACCOUNT
                    </Button>
                </Box>
                <Box className={classes.section} >
                    <Typography variant={"caption"} >
                        Already have an account?{" "}
                        <Link href="/auth/signin">
                            <Typography variant={"caption"} component={"span"} color={"primary"} >
                                Signin
                            </Typography>
                        </Link>
                    </Typography>
                </Box>

                {/*==== Terms of Service ====*/}
                <Box className={classes.section} >
                    <Typography variant={"caption"} >
                        Signing up signifies that you have read and agree to the
                        <Link href="/auth/terms-of-service">
                            <Typography variant={"caption"} component={"span"} color={"primary"} >
                                Terms of Service
                            </Typography>
                        </Link>
                        {" "}and our{" "}
                        <Link href="/auth/privacy-policy">
                            <Typography variant={"caption"} component={"span"} color={"primary"} >
                                Privacy Policy.
                            </Typography>
                        </Link>
                        <Button style={{ textTransform: 'none' }} onClick={handleToggle}>
                            <Typography variant={"caption"} component={"span"} color={"primary"} >
                                Cookie Preferences.
                            </Typography>
                        </Button>
                    </Typography>
                </Box>
                {/*==== Cookie Preferences ====*/}
                <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>

                </Backdrop>
            </Box>

        </form>
    )
}

export default SignInForm