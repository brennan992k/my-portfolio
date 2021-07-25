/* eslint-disable jsx-a11y/alt-text */
import { Box, Grid, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Visibility as VisibilityIcon, Favorite as FavoriteIcon, Sms as SmsIcon } from '@material-ui/icons'
import Image from '../Image'
import Link from '../Link'
import Section from '../Section'


const useStyles = makeStyles((theme) => ({
    left: {
        overflow: "hidden",
    },
    right: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
    },
    img: {
        maxHeight: 200,
        overflow: "hidden",
        "&:hover": {
            transform: "scale3d(1.1, 1.1, 1.1)"
        }
    },
    meta: {
        display: "flex",
        alignSelf: "flex-end"
    }
}))

export default function ArticleCard({ data }) {
    const classes = useStyles()

    return (
        <Section>
            <Grid container spacing={2}>
                <Grid item sm={12} md={4} >
                    <Box className={classes.left}>
                        <Image
                            src={data.img_url}
                            className={classes.img}
                        />
                    </Box>
                </Grid>
                <Grid item sm={12} md={8} >
                    <Box className={classes.right}>
                        <Box className={classes.content}>
                            <Link href={`/blog/${data.slug}`}>
                                <Typography variant={"h4"}>{data.title}</Typography>
                            </Link>
                            <Typography variant={"body1"}>{data.desc}</Typography>
                        </Box>
                        <Box className={classes.meta}>
                            <IconButton >
                                <VisibilityIcon fontSize={"small"} />
                            </IconButton>
                            <IconButton >
                                <FavoriteIcon fontSize={"small"} />
                            </IconButton>
                            <IconButton >
                                <SmsIcon fontSize={"small"} />
                            </IconButton>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Section>
    )
}