import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContextProvider'
import { css } from '@emotion/react'
import { theme, mq } from '../style/theme'
import { LinkButton } from './LinkButton'
import { useState } from 'react'
import { UserIcon } from './UserIcon'

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
                            <LinkButton to="/new" rounded size="sm">
                                投稿する
                            </LinkButton>
                            <div css={menu.wrapper}>
                                <button onClick={openMenu} css={menu.name}>
                                    <UserIcon
                                        username={auth.getName()}
                                        size={40}
                                    />
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
                                            <span css={menu.listUsername}>
                                                {auth.getName()}
                                            </span>
                                        </li>
                                        <li>
                                            <button
                                                css={menu.listItem}
                                                onClick={() =>
                                                    navigate('/profile')
                                                }
                                            >
                                                ✍ 名前変更
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={logout}
                                                css={menu.listItem}
                                            >
                                                🚪 ログアウト
                                            </button>
                                        </li>
                                    </ul>
                                </span>
                            </div>
                        </>
                    ) : (
                        <>
                            <LinkButton to="/login" size="sm" outline rounded>
                                ログイン
                            </LinkButton>
                            <LinkButton to="/signup" size="sm" rounded>
                                ユーザー登録
                            </LinkButton>
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
        padding: ' 1.2rem',
        [mq[0]]: {
            padding: '0 1.2rem 1.2rem 1.2rem',
        },
    }),
    wrapper: css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: theme.breakpoints.lg,
        margin: '0 auto',
        padding: '1rem clamp(0.5rem, 3vw, 2rem)',
        border: 'solid 1px',
        borderColor: theme.black,
        [mq[0]]: {
            paddingTop: '2.2rem',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderTop: 'none',
            flexDirection: 'column',
        },
    }),
    group: css({}),
    nav: css({
        display: 'flex',
        columnGap: '1rem',
        alignItems: 'center',
    }),
    title: css({
        textDecoration: 'none',
        fontSize: '1.5rem',
        fontWeight: '700',
        color: theme.black,
    }),
}

const menu = {
    wrapper: css({
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }),
    isVisible: css({
        display: 'block',
        opacity: 1,
        zIndex: 1,
    }),
    notVisible: css({
        display: 'none',
        opacity: 0,
        pointerEvents: 'none',
    }),
    name: css({
        cursor: 'pointer',
        fontSize: theme.fontSizes.md,
        border: 'none',
    }),
    listWrapper: css({
        position: 'absolute',
        width: 'max-content',
        right: '0',
        top: '110%',
        border: 'solid 2px',
        borderColor: theme.black,
        backgroundColor: theme.white,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadow.sm,
    }),
    list: css({
        listStyle: 'none',
        display: 'grid',
        padding: '5px 0',
        margin: '0',
        width: '100%',

        fontSize: theme.fontSizes.sm,
    }),
    listUsername: css({
        display: 'inline-flex',
        padding: '10px 20px',
    }),
    listItem: css({
        padding: '10px 20px',
        display: 'inline-flex',
        cursor: 'pointer',
        border: 'none',
        width: '100%',
        ':is(:focus-visible, :hover)': {
            backgroundColor: theme.colors.secondary,
            color: theme.white,
        },
    }),
}
