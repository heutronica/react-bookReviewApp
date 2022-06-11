import { css } from '@emotion/react'
import { theme } from '../theme'

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
        border: 'solid 1px',
        borderColor: theme.black,

        '&:hover,:focus': {
            textDecoration: 'none',
            boxShadow: 'none',
            transform: 'translate(1px, 1px)',
        },
    }),
    filled: css({
        backgroundColor: theme.colors.primary,
        color: theme.white,

        '&:hover,:focus': {
            //backgroundColor: theme.colors.secondaryTint,
        },
        '&:active': {
            //backgroundColor: theme.colors.secondaryShade,
        },
    }),
    outline: css({
        color: theme.black,

        '&:hover,:focus': {},
        '&:active': {},
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
