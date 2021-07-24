import React, { Fragment } from 'react'
import Header from './Header'
import Body from './Body'

const Layout = ({ children, title, ...props }) => {
    return (
        <Fragment>
            <Header title={title} />
            <Body {...props}>
                {children}
            </Body>
        </Fragment>
    )
}

export default Layout