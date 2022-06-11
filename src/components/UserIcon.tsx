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
        //backgroundColor: theme.black,
    })

    return (
        <div css={[styles.iconBase, iconSize, iconColor]}>
            <span css={styles.iconName}>{getFirstString}</span>
        </div>
    )
}

const styles = {
    iconBase: css({
        borderRadius: '999px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'solid 1px',
        borderColor: theme.black,
        //boxShadow: theme.shadow.sm,
    }),
    iconName: css({
        display: 'inline-block',
        color: theme.colors.white,
        fontWeight: '700',
        margin: '0',
    }),
}
