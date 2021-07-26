import { Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
    root: {
        animation: "$flash linear 1s infinite",
    },
    "@keyframes flash": {
        "0%": {
            opacity: 1,
        },
        "50%": {
            opacity: 0.1
        },
        "100%": {
            opacity: 1
        },
    }
}))

const Flash = ({ className, ...props }) => {
    const classes = useStyles()
    return <Box className={`${className} ${classes.root}`} {...props} />
}

export default Flash