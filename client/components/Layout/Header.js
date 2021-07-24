import { AppBar, Avatar, Box, Button, Hidden, IconButton, List, ListItem, ListItemText, SwipeableDrawer, Toolbar, Typography } from '@material-ui/core'
import Link from '../Link'
import { makeStyles } from '@material-ui/core/styles'
import { Menu } from '@material-ui/icons'
import { useState } from 'react'
import { useSignOut, useUserInfo } from '../../api/auth'

const useStyles = makeStyles((theme) => ({
    toolBar: {
        display: "flex",
        justifyContent: "space-between",
    },
    section: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        display: "flex",
        alignItems: "center"
    }
}))

const Header = () => {
    const classes = useStyles()
    const [openDrawer, setOpen] = useState(false)

    const userInfo = useUserInfo()
    const { loading, data, error, sendRequest } = useSignOut()

    const toggleDrawer = (value) => {
        if (typeof value == 'boolean' && value != openDrawer) {
            return () => setOpen(value)
        } else {
            return () => setOpen(!openDrawer)
        }
    }

    return (
        <AppBar position="sticky" >
            <Toolbar className={classes.toolBar}>
                {/*==== Logo ====*/}
                <Link href="/" as="/" >
                    <img src={"/logo.svg"} height={40} />
                </Link>
                {/*==== Nav ====*/}
                <Hidden smDown>
                    <Box className={classes.section}>
                        {
                            userInfo ? (
                                <>
                                    <Link href={userInfo["profile"]}>
                                        <Avatar>{userInfo["name"]} </Avatar>
                                    </Link>
                                    <Button onClick={sendRequest}>
                                        <Typography>Log out</Typography>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link href="/account/signin"  >
                                        <Typography>Sign in</Typography>
                                    </Link>
                                    <Link href="/" as="/" >
                                        <Typography>Sign up</Typography>
                                    </Link>
                                </>
                            )
                        }

                    </Box>
                </Hidden>
                <Hidden mdUp>
                    <IconButton aria-label="Open Navigation" onClick={toggleDrawer()} >
                        <Menu />
                    </IconButton>
                </Hidden>
            </Toolbar>
            {/*==== Drawer menu ====*/}
            <Hidden mdUp>
                <SwipeableDrawer anchor={"top"} open={openDrawer} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
                    <Box width="auto" role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                        <List>
                            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </SwipeableDrawer>
            </Hidden>
        </AppBar>
    )
}

export default Header