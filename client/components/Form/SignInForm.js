import { Box, Button, LinearProgress, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useRef } from 'react'
import { useSignin } from "../../api/auth"
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

const SignInForm = ({ className }) => {

    const classes = useStyles()
    const params = useRef({ email: "", password: "", }).current
    const { error, loading, sendRequest } = useSignin(params)

    const onChangeMail = (e) => params.email = e.target.value
    const onChangePassword = (e) => params.password = e.target.value

    return (
        <form className={className}>
            {loading && <LinearProgress />}
            <Box className={classes.container}>
                <Box className={classes.section}>
                    <Typography variant={"h3"} className={classes.title} color={"primary"}>Sign in</Typography>
                    <Typography variant={"caption"} >Wellcome to your world !</Typography>
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
                        SIGN IN
                    </Button>
                </Box>
                <Box className={classes.section} display={"flex"} justifyContent={"flex-end"} >
                    <Typography variant={"caption"} align={"right"} >
                        Forgot your password? {" "}
                        <Link href="/auth/forgot">
                            <Typography variant={"caption"} component={"span"} color={"primary"} >
                                Forgot
                            </Typography>
                        </Link>
                    </Typography>
                </Box>

                <Box className={classes.section} >
                    <Typography variant={"caption"} >
                        Are you new here?{" "}
                        <Link href="/auth/signup">
                            <Typography variant={"caption"} component={"span"} color={"primary"} >
                                Signup
                            </Typography>
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </form>
    )
}

export default SignInForm