import { css } from '@emotion/react'
import { theme, mq } from './theme'

export const globalStyle = {
    '#root': css({
        height: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    }),
    body: css({
        fontFamily: 'Open Sans, Noto Sans JP, sans-serif',
        color: theme.black,
    }),
    p: css({
        margin: '0',
        fontSize: theme.fontSizes.md,
    }),
    h1: css({
        margin: '0',
        fontSize: 'clamp(1.3rem, 0.68rem + 1.6vw, 3rem)',
        fontWeight: '700',
    }),
    h2: css({
        margin: '0',
        fontSize: 'clamp(1.2rem, 0.68rem + 1.6vw, 1.5rem)',
        fontWeight: '700',
    }),
    h3: css({
        margin: '0',
        fontSize: '1.2rem',
        fontWeight: '700',
    }),
    a: css({
        color: theme.colors.primary,
        textDecoration: 'none',
        '&:hover,:focus': {
            textDecoration: 'underline',
        },
    }),
}
