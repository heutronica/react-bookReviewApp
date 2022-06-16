import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContextProvider'
import { css } from '@emotion/react'
import { theme, mq } from '../style/theme'
import { LinkButton } from './LinkButton'
import { Menu } from './Menu'
import { UserIcon } from './UserIcon'

export const Header = () => {
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
                            <LinkButton to="/new" rounded size="sm">
                                投稿する
                            </LinkButton>
                            {/*TODO: メニューアイテムの渡し方が気持ち悪い、もっと良い方法があると思う、ドット記法とか*/}
                            <Menu
                                menuItem={[
                                    {
                                        action: () => navigate('/profile'),
                                        label: '✍ 名前変更',
                                    },
                                    {
                                        action: logout,
                                        label: '🚪 ログアウト',
                                    },
                                ]}
                            >
                                <UserIcon username={auth.getName()} size={40} />
                            </Menu>
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
        padding: ' 0.5rem',
        [mq[0]]: {
            padding: '0 0.2rem 0.2rem 0.2rem',
        },
    }),
    wrapper: css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: theme.breakpoints.lg,
        margin: '0 auto',
        padding: '0 clamp(0.5rem, 3vw, 2rem)',
        border: theme.border.md,
        borderRadius: theme.radius.md,
        borderColor: theme.black,
        backgroundColor: theme.paperWhite,
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
        fontSize: '2.5rem',
        fontWeight: '800',
        color: theme.black,
    }),
}
