import React from 'react'
import { Link } from 'react-router-dom'
import { theme } from '../style/theme'
import { css } from '@emotion/react'

type Props = {
    id: string
    title: string
}

export const BookCover: React.FC<Props> = ({ id, title }) => {
    let randomColorPick = (obj: defaultTheme['defaultColors']) => {
        let keys = Object.keys(obj)

        const parseNum = parseInt(id.slice(0, 1), 16)
        let convertNum = Math.floor((parseNum / 16) * 10)

        return obj[keys[convertNum]]
    }

    let backgroundColor = css({
        backgroundColor: randomColorPick(theme.defaultColors)[8],
    })

    return (
        <Link to={'/detail/' + id} css={styles.title}>
            <div css={[styles.wrapper, backgroundColor]}>{title}</div>
        </Link>
    )
}

const styles = {
    wrapper: css({
        display: 'flex',
        flexShrink: '0',
        borderRadius: theme.radius.md,
        boxShadow: theme.shadow.sm,
        width: '100%',
        margin: '0 auto',
        aspectRatio: '3 / 4',
        cursor: 'pointer',
        padding: '15px',
        overflow: 'hidden',
        wordBreak: 'break-word',
    }),
    title: css({
        color: theme.white,
        textDecoration: 'none',
        //fontSize: theme.fontSizes.sm,
        fontSize: '100%',
        fontWeight: '700',
        lineHeight: '0.9rem',
    }),
}
