import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContextProvider'
import { css } from '@emotion/react'
import { theme } from '../style/theme'
import { Button } from './Button'

export const Footer = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const logout = () => {
        auth.signOut(() => {
            navigate('/login', { replace: true })
        })
    }
    return (
        <header css={styles.header}>
            <div css={styles.wrapper}>
                <div css={styles.group}>
                    <Link to="/" css={styles.title}>
                        Favbook
                    </Link>
                </div>
                <div css={styles.nav}>
                    {auth.isAuth ? (
                        <>
                            <Button onClick={logout}>ログアウト</Button>
                        </>
                    ) : (
                        <>
                            <Button link to="/login" size="sm" outline rounded>
                                ログイン
                            </Button>
                            <Button link to="/signup" size="sm" rounded>
                                ユーザー登録
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

const styles = {
    header: css({
        position: 'relative',
        backgroundColor: theme.defaultColors.gray[5],
        padding: '20px 30px',
    }),
    wrapper: css({
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: theme.breakpoints.lg,
        margin: '0 auto',
    }),
    group: css({}),
    nav: css({
        display: 'flex',
        columnGap: '1rem',
    }),
    title: css({
        textDecoration: 'none',
        fontSize: '1.5rem',
        fontWeight: '700',
        color: theme.white,
    }),
    name: css({
        color: theme.white,
        cursor: 'pointer',
    }),
}
