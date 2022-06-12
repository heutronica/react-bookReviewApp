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
    if (to.match('http')) {
        return (
            <>
                <a href={to} css={style} target="_blank" rel="noopener">
                    {children}
                </a>
            </>
        )
    }
    return (
        <>
            <Link to={to} css={style}>
                {children}
            </Link>
        </>
    )
}
