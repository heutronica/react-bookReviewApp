import React from 'react'
import { Link } from 'react-router-dom'
import { buttonStyle } from '../style/parts/button'

type Props = React.ComponentProps<'button'> & {
    children: React.ReactNode
    outline?: boolean
    rounded?: boolean
    size?: 'sm' | 'lg'
    to: string
}

export const LinkButton: React.FC<Props> = ({
    size,
    outline,
    children,
    to,
    rounded,
}) => {
    const style = buttonStyle(size, outline, rounded)
    return (
        <>
            <Link to={to} css={style}>
                {children}
            </Link>
        </>
    )
}
