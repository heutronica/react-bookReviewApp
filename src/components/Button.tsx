import React from 'react'
import { buttonStyle } from '../style/button'

type Props = React.ComponentProps<'button'> & {
    children: React.ReactNode
    outline?: boolean
    rounded?: boolean
    size?: 'sm' | 'lg'
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
}

export const Button: React.FC<Props> = ({
    size,
    outline,
    onClick,
    children,
    rounded,
}) => {
    const style = buttonStyle(size, outline, rounded)
    return (
        <button css={style} onClick={onClick}>
            {children}
        </button>
    )
}
