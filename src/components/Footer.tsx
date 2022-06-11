import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContextProvider'
import { css } from '@emotion/react'
import { theme, mq } from '../style/theme'

export const Footer = () => {
    return (
        <footer css={styles.footer}>
            <div css={styles.wrapper}>
                <Link to="/" css={styles.title}>
                    Favbook
                </Link>
            </div>
        </footer>
    )
}

const styles = {
    footer: css({
        backgroundColor: theme.colors.light,
        position: 'relative',
        marginTop: 'auto',
        padding: ' 2rem 1.2rem',
        borderTop: 'solid 1px',
        borderColor: theme.black,
        [mq[0]]: {
            padding: '0 1.2rem 1.2rem 1.2rem',
        },
    }),
    wrapper: css({
        display: 'flex',
        justifyContent: 'center',
        maxWidth: theme.breakpoints.lg,
        margin: '0 auto',
        padding: '1rem clamp(0.5rem, 3vw, 2rem)',
    }),
    title: css({
        textDecoration: 'none',
        fontSize: '1.2rem',
        fontWeight: '700',
        color: theme.black,
    }),
}
