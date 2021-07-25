import React from 'react'
import NLink from 'next/link'

const Link = ({ children, ...props }) => {
    return (
        <NLink passHref scroll={false} {...props}>
            <a {...props}>
                {children}
            </a>
        </NLink>
    )
}

export default Link