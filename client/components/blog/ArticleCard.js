/* eslint-disable jsx-a11y/alt-text */
import { Box, Grid, IconButton, Typography } from '@material-ui/core'
import { Skeleton } from "@material-ui/lab"
import { makeStyles } from '@material-ui/core/styles'
import { Visibility as VisibilityIcon, Favorite as FavoriteIcon, Sms as SmsIcon } from '@material-ui/icons'
import Image from '../Image'
import Link from '../Link'
import Section from '../Section'


const useStyles = makeStyles((theme) => ({
    left: {
        overflow: "hidden",
        width: "100%",
        height: "100%",
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
        minHeight: 150,
        width: "100%",
        backgroundColor: "rgba(200,200,200, 0.5)",
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

export const ArticleCardSkeleton = ({ className }) => {
    const classes = useStyles()
    return (
        <Section className={className}>
            <Grid container spacing={2}>
                <Grid item sm={12} md={4} >
                    <Box className={classes.left}>
                        <Skeleton variant="rect" width={"100%"} height={200} />
                    </Box>
                </Grid>
                <Grid item sm={12} md={8} >
                    <Box className={classes.right}>
                        <Box className={classes.content}>
                            <Skeleton variant="text" width="40%" />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                        </Box>
                        <Box className={classes.meta}>
                            <Skeleton variant="text" width={100} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Section>
    )
}

export default function ArticleCard({ data, className }) {
    const classes = useStyles()

    return (
        <Section className={className}>
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