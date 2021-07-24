import { Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useState } from "react"
import Navbar from "../../client/components/admin/Navbar"
import Slidebar from "../../client/components/admin/SlideBar"

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        width: '100%'
    },
    wrapper: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden',
        paddingTop: 64,
        [theme.breakpoints.up('lg')]: {
            paddingLeft: 256
        }
    },
    container: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden'
    },
    content: {
        flex: '1 1 auto',
        height: '100%',
        overflow: 'auto'
    }
}))

const tabs = []

const ContentTab = ({ tab }) => {
    switch (tab) {
        case 0:
            return null
        default:
            return null
    }
}

const Page = () => {
    const classes = useStyles()
    const [isMobileNavOpen, setMobileNavOpen] = useState(false)
    const [tab, setTab] = useState()
    const onSelectTab = (tab) => {

    }

    return (
        <Box className={classes.root}>
            <Navbar onMobileNavOpen={() => setMobileNavOpen(true)} />
            <Slidebar
                onMobileClose={() => setMobileNavOpen(false)}
                openMobile={isMobileNavOpen}
                onSelectTab={onSelectTab}
                tab={tab}
                tabs={tabs}
            />
            <Box className={classes.wrapper}>
                <Box className={classes.container}>
                    <Box className={classes.content}>
                        <ContentTab tab={tab} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Page