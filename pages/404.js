import { Box, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Image from 'next/image'

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: 'background.default',
        display: 'flex',
        height: "100vh",
        width: "100vw",
        justifyContent: 'center',
        alignItems: "center"
    },
    img: {
        marginTop: 50,
        display: 'inline-block',
        width: 500,
        height:300
    },
    imgContainer: {
        textAlign: 'center',
    }
}))

const NotFound = () => {
    const classes = useStyles()
    return (
        <Box className={classes.root} >
            <Container maxWidth="md">
                <Typography
                    align="center"
                    color="textPrimary"
                    variant="h1"
                >
                    404: The page you are looking for isn’t here
                </Typography>
                <Typography
                    align="center"
                    color="textPrimary"
                    variant="subtitle2"
                >
                    You either tried some shady route or you came here by mistake.
                    Whichever it is, try using the navigation
                </Typography>
                <Box className={classes.imgContainer}>
                    <Image
                        alt="Under development"
                        src="/static/images/undraw_page_not_found_su7k.svg"
                        width={500}
                        height={300}
                    />
                </Box>
            </Container>
        </Box>
    )
}

export default NotFound
