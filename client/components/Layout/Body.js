import { Grid, Hidden } from '@material-ui/core'
import React from 'react'
import Sticky from "../Sticky"

// xs: 0px
// sm: 600px
// md: 900px
// lg: 1200px
// xl: 1536px

const Body = ({ left, children, right }) => {
    return (
        <Grid container>
            <Hidden lgDown>
                <Grid item xl={2}>
                    {left}
                </Grid>
            </Hidden>
            <Grid item xs={12} sm={8} md={9} xl={8} >
                {children}
            </Grid>
            <Grid item xs={12} sm={4} md={3} xl={2}>
                <Sticky offsetTop={40} offsetBottom={40}>
                    {right}
                </Sticky>
            </Grid>
        </Grid>
    )
}

export default Body