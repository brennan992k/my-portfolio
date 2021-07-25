import { Box } from "@material-ui/core"
import NImage from "next/image"

const Image = ({ src, ...props }) => {
    return (
        <Box {...props} >
            <NImage src={src} layout={"responsive"} width={"100%"} height={"100%"} />
        </Box>
    )
}

export default Image