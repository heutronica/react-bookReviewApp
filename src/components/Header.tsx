import { Suspense } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContextProvider'
import { css } from '@emotion/react'
import { theme } from '../style/theme'
import { Button } from './Button'
import { useState } from 'react'

export const Header = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const logout = () => {
        auth.signOut(() => {
            navigate('/login', { replace: true })
        })
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const openMenu = () => {
        if (isMenuOpen) {
            return setIsMenuOpen(false)
        }
        return setIsMenuOpen(true)
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
                            <div css={menu.wrapper}>
                                <button onClick={openMenu} css={menu.name}>
                                    {auth.getName()}
                                </button>
                                <span
                                    css={[
                                        isMenuOpen
                                            ? menu.isVisible
                                            : menu.notVisible,
                                        menu.listWrapper,
                                    ]}
                                >
                                    <ul css={menu.list}>
                                        <li>
                                            <button css={menu.listItem}>
                                                <Link to="/profile">
                                                    名前変更
                                                </Link>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={logout}
                                                css={menu.listItem}
                                            >
                                                ログアウト
                                            </button>
                                        </li>
                                    </ul>
                                </span>
                            </div>
                            <Suspense fallback={<p>loading</p>}></Suspense>
                            <Button link to="/new" rounded size="sm">
                                投稿する
                            </Button>
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
        backgroundColor: theme.colors.primary,
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

const menu = {
    wrapper: css({
        position: 'relative',
    }),
    isVisible: css({
        opacity: 1,
        zIndex: 1,
    }),
    notVisible: css({
        opacity: 0,
        pointerEvents: 'none',
    }),
    name: css({
        cursor: 'pointer',
        fontSize: theme.fontSizes.md,
        border: 'none',
        color: theme.white,
        ':is(:focus-visible, :hover)': {
            textDecoration: 'underline',
        },
    }),
    listWrapper: css({
        position: 'absolute',
        width: 'fit-content',
        right: 0,
        top: '100%',
        textAlign: 'right',
        backgroundColor: theme.white,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadow.md,
    }),
    list: css({
        listStyle: 'none',
        display: 'grid',
        padding: '5px 0',
        margin: '0',
        width: '100%',
    }),
    listItem: css({
        display: 'inline-flex',
        justifyContent: 'flex-end',
        cursor: 'pointer',
        padding: '10px 20px',
        fontSize: theme.fontSizes.sm,
        border: 'none',
        width: '100%',
        ':is(:focus-visible, :hover)': {
            backgroundColor: theme.colors.secondary,
            color: theme.white,
        },
    }),
}
