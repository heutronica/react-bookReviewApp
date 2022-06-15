import { useState } from 'react'
import { css } from '@emotion/react'
import { theme, mq } from '../style/theme'
import { useRef } from 'react'
import { useEffect } from 'react'

type Props = {
    children: React.ReactNode
    menuItem: {
        action: any
        label: string
    }[]
}

export const Menu: React.FC<Props> = ({ children, menuItem }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuListRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickToCloseMenu = (e: any) => {
            // TODO: anyを付けたくないが、TSでのaddEventListenerはハマりポイントなのできちんと読み直す
            const element = menuListRef.current
            if (!isMenuOpen || element?.contains(e.target)) return
            setIsMenuOpen(false)
        }
        window.addEventListener('click', handleClickToCloseMenu)
        return () => {
            window.removeEventListener('click', handleClickToCloseMenu)
        }
    }, [isMenuOpen, menuListRef])

    return (
        <div css={styles.wrapper} ref={menuListRef}>
            <button
                onClick={() => setIsMenuOpen((prevState) => !prevState)}
                css={styles.name}
            >
                {children}
            </button>
            <span
                css={[
                    isMenuOpen ? styles.isVisible : styles.notVisible,
                    styles.listWrapper,
                ]}
            >
                <ul css={styles.list}>
                    {menuItem.map((item) => (
                        <li key={item.label}>
                            <button css={styles.listItem} onClick={item.action}>
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </span>
        </div>
    )
}

const styles = {
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
            backgroundColor: theme.colors.secondary.default,
            color: theme.white,
        },
    }),
}
