import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import ResetForm from '../../../../client/components/Form/ResetForm'

const Page = () => {

    return (
        <Grid
            container
            spacing={0}
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={10} sm={8} md={4} lg={4} >
                <Paper>
                    <ResetForm />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Page