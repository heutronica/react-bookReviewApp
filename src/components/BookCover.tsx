import React from 'react'
import { Link } from 'react-router-dom'
import { theme } from '../style/theme'
import { css } from '@emotion/react'

type Props = {
    id: string
    title: string
}

export const BookCover: React.FC<Props> = (props) => {
    let randomColorPick = (obj: typeof theme.defaultColors) => {
        let keys = Object.keys(obj)

        const parseNum = parseInt(props.id.slice(0, 1), 16)
        let convertNum = Math.floor((parseNum / 16) * 10)

        return obj[keys[convertNum]]
    }

    let backgroundColor = css({
        backgroundColor: randomColorPick(theme.defaultColors)[8],
    })

    return (
        <Link to={'/detail/' + props.id} css={styles.title}>
            <div css={[styles.wrapper, backgroundColor]}>{props.title}</div>
        </Link>
    )
}

const styles = {
    wrapper: css({
        display: 'flex',
        alignItems: 'center',
        flexShrink: '0',
        borderRadius: theme.radius.md,
        boxShadow: theme.shadow.sm,
        width: 500 / 5 + 'px',
        height: 700 / 5 + 'px',
        cursor: 'pointer',
        padding: '10px',
    }),
    title: css({
        color: theme.white,
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        fontWeight: '700',
        lineHeight: '0.9rem',
    }),
}
