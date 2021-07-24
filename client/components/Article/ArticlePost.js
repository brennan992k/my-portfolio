import React, { useState } from 'react'
import { Card, CardHeader, CardMedia, CardContent, Avatar, IconButton, Typography, Zoom, Box, Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { timestampToTime } from "../../utils/time"
import Link from '../Link'
import { Skeleton } from '@material-ui/lab';
import UnderlineText from '../UnderlineText'

const useStyles = makeStyles((theme) => ({
    root: {
        transition: "transform 5s ease-in-out",
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: "100%",
    },
    cardHovered: {
        transform: "scale3d(1.01, 1.01, 1)"
    },
    image: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    chipContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    chip: {
    }

}))

export const ArticlePostSkeleton = () => {
    const classes = useStyles()
    return (
        <Card className={classes.root} >
            <CardHeader avatar={(<Skeleton variant="circle" width={40} height={40} />)} />
            <CardContent>
                <Skeleton variant="rect" width={210} height={118} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Box className={classes.chipContainer}>
                </Box>
            </CardContent>
        </Card>
    )
}

const ArticlePost = ({ data }) => {

    const classes = useStyles()
    const [state, setState] = useState({
        raised: false,
        shadow: 1,
    })

    return (
        <Card
            className={classes.root}
            classes={{ root: state.raised ? classes.cardHovered : "" }}
            onMouseOver={() => setState({ raised: true, shadow: 3 })}
            onMouseOut={() => setState({ raised: false, shadow: 1 })}
            raised={state.raised} zdepth={state.shadow}
        >
            <CardHeader
                avatar={(
                    <Link href={data.author.profile}>
                        <Avatar alt={data.author.name} src={data.author.avatar} >{data.author.name}</Avatar>
                    </Link>
                )}
                title={data.author.name}
                subheader={timestampToTime(data.created_at, true)}
            />
            <CardMedia
                image={data.img_url}
                title={data.title}
                className={classes.image}
            >
            </CardMedia>
            <CardContent>
                <Typography variant="h6">
                    {data.title}
                </Typography>
                <Typography variant="body2" >
                    {data.desc}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default ArticlePost