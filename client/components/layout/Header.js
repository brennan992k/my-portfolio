import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, List, ListItem, Grid, SwipeableDrawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import useWindowSize from "../DisplacementSphere/useWindowSize"
import { Fragment } from 'react-is';
import HideOnScroll from '../HideOnScroll';

const useStyles = makeStyles(() => ({
    list: {
        width: 200,
    },
    padding: {
        paddingRight: 30,
        cursor: "pointer",
    },
    sideBarIcon: {
        padding: 0,
        cursor: "pointer",
    }
}))

const menu = [
    {
        label: "Home",
        target: "/",
        key: 0,
    },
    {
        label: "Blog",
        target: "/blog",
        key: 1,
    },
    {
        label: "Video",
        target: "/video",
        key: 2,
    },
    {
        label: "App",
        target: "/app",
        key: 3,
    }
]

const Header = (props) => {
    const classes = useStyles()
    const { width } = useWindowSize()
    const [state, setState] = useState(false)
    const toggle = () => setState(!state)
    const close = () => setState(false)
    const open = () => setState(true)

    return (
        <HideOnScroll>
            <AppBar  >
                <Toolbar>
                    {width <= 600 ? (
                        <Fragment>
                            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="h3"></Typography>
                                <Typography variant="h3">Title</Typography>
                                <MenuIcon className={classes.sideBarIcon} onClick={toggle} />
                            </Grid>
                            <SwipeableDrawer
                                open={state}
                                onClose={close}
                                onOpen={open}>
                                <div
                                    tabIndex={0}
                                    role="button"
                                    onClick={close}
                                    onKeyDown={close}
                                >
                                    <List className={classes.list}>
                                        {
                                            menu.map((item) => (
                                                <ListItem
                                                    key={item.key}
                                                    button
                                                    divider
                                                >
                                                    {item.label}
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </div>
                            </SwipeableDrawer>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Typography variant="h3" style={{ flexGrow: 1 }}  >Title</Typography>
                            {
                                menu.map((item) => (
                                    <Typography
                                        key={`${item.key}`}
                                        variant="subtitle1"
                                        className={classes.padding}
                                    >
                                        {item.label}
                                    </Typography>
                                ))
                            }
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        </HideOnScroll>

    );
}


export default Header