import { css } from '@emotion/react'
import { theme } from '../style/theme'

export const buttonStyle = (
    size?: string,
    outline?: boolean,
    rounded?: boolean
) => {
    const style = [styles.base]

    if (size == 'sm') {
        style.push(styles.size.sm)
    } else if (size == 'lg') {
        style.push(styles.size.lg)
    } else {
        style.push(styles.size.md)
    }

    outline ? style.push(styles.outline) : style.push(styles.filled)

    rounded ? style.push(styles.rounded) : style.push(styles.normal)

    return [style]
}

const styles = {
    base: css({
        display: 'inline-block',
        height: 'fit-content',
        textAlign: 'center',
        cursor: 'pointer',
        boxShadow: theme.shadow.sm,
        textDecoration: 'none',

        '&:hover,:focus': {
            boxShadow: 'none',
        },
    }),
    filled: css({
        borderWidth: '0',
        backgroundColor: theme.colors.secondary,
        color: theme.white,

        '&:hover,:focus': {
            backgroundColor: theme.colors.secondaryTint,
        },
        '&:active': {
            backgroundColor: theme.colors.secondaryShade,
        },
    }),
    outline: css({
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: theme.white,
        boxSizing: 'border-box',
        backgroundColor: theme.colors.primary,
        color: theme.white,

        '&:hover,:focus': {
            backgroundColor: theme.colors.primaryTint,
        },
        '&:active': {
            backgroundColor: theme.colors.primaryShade,
        },
    }),
    rounded: css({
        borderRadius: '999px',
    }),
    normal: css({
        borderRadius: theme.radius.md,
    }),

    size: {
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
    },
}
