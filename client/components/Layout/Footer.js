import { Box, Grid } from '@material-ui/core'
import WaveBorder from '../WaveBorder'

const Footer = () => {
    return (
        <Box>
            <WaveBorder
                upperColor="#FFFFFF"
                lowerColor={"green"}
                animationNegativeDelay={0}
            />
        </Box>
    )
}

export default Footer