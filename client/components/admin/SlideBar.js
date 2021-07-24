import { useEffect } from 'react';
import { Avatar, Box, Divider, Drawer, Hidden, List, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from '../Link'
import NavItem from "./NavItem"
import { useUserInfo } from '../../api/auth';

const items = [

    {
        href: '/app/account',
        title: 'Account'
    },
    {
        href: '/app/settings',
        title: 'Settings'
    },
];

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    contentRoot: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    session1: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2)
    },
    session2: {
        padding: theme.spacing(2)
    },
    avatar: {
        cursor: 'pointer',
        width: 64,
        height: 64
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        top: 64,
        height: 'calc(100% - 64px)'
    },
}))

const Sidebar = ({ onMobileClose, openMobile }) => {
    const classes = useStyles()
    const userInfo = useUserInfo()

    useEffect(() => {
        if (openMobile && onMobileClose) onMobileClose();
    }, []);

    const content = (
        <Box className={classes.contentRoot} >
            {userInfo ? (
                <Box className={classes.session1}>
                    <Link href={userInfo.profile}>
                        <Avatar src={userInfo.avatar} className={classes.avatar} />
                    </Link>
                    <Typography color="textPrimary" variant="h5">
                        {userInfo.name}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                        {userInfo.desc}
                    </Typography>
                </Box>
            ) : null}
            <Divider />
            <Box className={classes.session2}>
                <List>
                    {items.map((item) => (
                        <NavItem
                            href={item.href}
                            key={item.title}
                            title={item.title}
                            icon={item.icon}
                        />
                    ))}
                </List>
            </Box>
        </Box>
    );

    return (
        <>
            <Hidden mdUp>
                <Drawer
                    anchor="left"
                    onClose={onMobileClose}
                    open={openMobile}
                    variant="temporary"
                    className={classes.drawer}
                    classes={{ paper: classes.drawerPaper }}
                >
                    {content}
                </Drawer>
            </Hidden>
            <Hidden mdDown>
                <Drawer
                    anchor="left"
                    open
                    variant="permanent"
                    className={classes.drawer}
                    classes={{ paper: classes.drawerPaper }}
                >
                    {content}
                </Drawer>
            </Hidden>
        </>
    );
};

export default Sidebar;
