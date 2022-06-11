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
        <>
            <div css={[styles.wrapper, backgroundColor]}>
                <p css={styles.title}>{title}</p>
            </div>
        </>
    )
}

const styles = {
    wrapper: css({
        display: 'flex',
        flexShrink: '0',
        borderRadius: theme.radius.md,
        boxShadow: theme.shadow.md,
        width: '100%',
        margin: '0 auto',
        alignItems: 'center',
        aspectRatio: '3 / 4',
        padding: '15%',
        overflow: 'hidden',
        wordBreak: 'break-word',
        border: 'solid 1px',
        borderColor: theme.black,
    }),
    title: css({
        color: theme.white,
        lineHeight: '1.1',
        fontSize: theme.fontSizes.sm,
        fontWeight: '700',
        display: '-webkit-box',
        overflow: 'hidden',
        '-webkitBoxOrient': 'vertical',
        '-webkitLineClamp': '5',
    }),
}
