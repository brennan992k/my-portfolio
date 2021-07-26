import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Section from '../Section';
import { Button, Typography } from '@material-ui/core';
import { Create as CreateIcon } from '@material-ui/icons';
import { useUserInfo } from '../../api/auth'
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: theme.spacing(1),
        "& > *": {
            margin: theme.spacing(1)
        }
    }

}))

const WriteArticle = () => {
    const classes = useStyles();
    const userInfo = useUserInfo()
    const router = useRouter()

    const onWritePost = () => {
        if (userInfo) {
            router.push("/blog/create")
        } else {
            router.push("/account/signin")
        }
    }

    return (
        <Section className={classes.root}>
            <Typography align={"center"} >
                Are you an amazing writer?
            </Typography>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<CreateIcon />}
                onClick={onWritePost}
            >
                Create new post
            </Button>
        </Section >

    );
}

export default WriteArticle