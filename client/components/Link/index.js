import React from 'react'
import NLink from 'next/link'

const Link = (props) => {
    return <NLink passHref scroll={false}  {...props} />
}

export default Link