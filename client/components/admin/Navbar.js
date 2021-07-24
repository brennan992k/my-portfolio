import { AppBar, Box, Hidden, IconButton, Toolbar } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"
import MenuIcon from '@material-ui/icons/Menu'
import InputIcon from '@material-ui/icons/Input'
import Logo from '../Logo'
import Link from '../Link'

const useStyles = makeStyles((theme) => ({
    root: {
        zIndex: theme.zIndex.drawer + 1,
    }
}))

const Navbar = ({ onMobileNavOpen, ...rest }) => {

    const classes = useStyles()

    return (
        <AppBar elevation={0}  {...rest} className={classes.root}>
            <Toolbar>
                <Link href={"/"}>
                    <Logo />
                </Link>
                <Box sx={{ flexGrow: 1 }} />
                <Hidden lgDown>
                    <IconButton color="inherit">
                    </IconButton>
                    <IconButton color="inherit">
                        <InputIcon />
                    </IconButton>
                </Hidden>
                <Hidden lgUp>
                    <IconButton color="inherit" onClick={onMobileNavOpen} >
                        <MenuIcon />
                    </IconButton>
                </Hidden>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
