import React, { Fragment } from 'react'
import { Container, Toolbar } from '@material-ui/core'
import Header from './Header'
import MyHead from './MyHead'
import BackTop from '../BackTop'

const Layout = ({ children, ...props }) => (
    <Fragment>
        <MyHead />
        <Header />
        <Toolbar id="back-to-top-anchor" />
        <Container maxWidth={"lg"}>
            {children}
        </Container>
        <BackTop {...props} anchor={"#back-to-top-anchor"} />
    </Fragment>
)

export default Layout