import { theme } from '../style/theme'
import { css } from '@emotion/react'
import { useAuth } from '../lib/AuthContextProvider'

type Props = {
    size: number
    username: string
}

export const UserIcon: React.FC<Props> = ({ size, username }) => {
    const getFirstString = username.slice(0, 1)

    //const colorPicker = () => {
    //    const random = Math.round(Math.random() * 10)
    //    let keys = Object.keys(theme.defaultColors)
    //    return theme.defaultColors[keys[random]][8]
    //}

    const iconSize = css({
        width: size + 'px',
        height: size + 'px',
        fontSize: size / 3,
    })
    let iconColor = css({
        //backgroundColor: colorPicker(),
        backgroundColor: theme.colors.tertiary,
    })

    return (
        <div css={[styles.iconBase, iconSize, iconColor]}>
            <p css={styles.iconName}>{getFirstString}</p>
        </div>
    )
}

const styles = {
    iconBase: css({
        borderRadius: '999px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: theme.shadow.sm,
    }),
    iconName: css({
        color: theme.colors.white,
        fontWeight: '700',
        margin: '0',
    }),
}
