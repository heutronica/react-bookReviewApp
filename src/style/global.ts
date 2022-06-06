import { css } from '@emotion/react'
import { theme } from './theme'

export const globalStyle = {
    body: css({
        fontFamily: 'Open Sans, Noto Sans JP, sans-serif',
        fontSize: '16px',
        color: theme.black,
    }),
}
