import { css } from '@emotion/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { theme } from '../style/theme'

type Props = React.ComponentProps<'button'> & {
    children: React.ReactNode
    className?: string
    label?: string
    outline?: boolean
    rounded?: boolean
    size?: 'sm' | 'lg'
    //以下をいい感じに切り離せないか？
    link?: boolean
    to?: string
    onClick?: () => VoidFunction
}

export const Button: React.FC<Props> = (props) => {
    const style = [base]

    //sizeのこと
    if (props.size == 'sm') {
        style.push(size.sm)
    } else if (props.size == 'lg') {
        style.push(size.lg)
    } else {
        style.push(size.md)
    }

    {
        props.outline ? style.push(outline) : style.push(filled)
    }
    {
        props.rounded ? style.push(rounded) : style.push(normal)
    }

    return (
        <>
            {props.link ? (
                <Link
                    to={props.to}
                    //下、共通化したいな
                    css={style}
                >
                    {props.children}
                </Link>
            ) : (
                <button css={style} onClick={props.onClick}>
                    {props.children}
                </button>
            )}
        </>
    )
}

const base = css({
    display: 'inline-block',
    height: 'fit-content',
    textAlign: 'center',
    cursor: 'pointer',
    boxShadow: theme.shadow.sm,
    textDecoration: 'none',

    '&:hover,:focus': {
        boxShadow: 'none',
    },
})

const filled = css({
    borderWidth: '0',
    backgroundColor: theme.colors.secondary[1],
    color: theme.white,

    '&:hover,:focus': {
        backgroundColor: theme.colors.secondary[2],
    },
    '&:active': {
        backgroundColor: theme.colors.secondary[1],
    },
})
const outline = css({
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.white,
    boxSizing: 'border-box',
    backgroundColor: theme.colors.primary[1],
    color: theme.white,

    '&:hover,:focus': {
        backgroundColor: theme.colors.primary[2],
    },
    '&:active': {
        backgroundColor: theme.colors.primary[1],
    },
})
const rounded = css({
    borderRadius: '999px',
})
const normal = css({
    borderRadius: theme.radius.md,
})

const size = {
    sm: css({
        padding: '8px 20px',
        fontSize: theme.fontSizes.sm,
        fontWeight: '600',
    }),
    md: css({
        padding: '8px 40px',
        fontSize: theme.fontSizes.md,
        fontWeight: '600',
    }),
    lg: css({
        width: '100%',
        padding: '8px 40px',
        fontSize: theme.fontSizes.md,
        fontWeight: '600',
    }),
}
