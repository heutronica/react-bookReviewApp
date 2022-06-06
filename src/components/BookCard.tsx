import { theme } from '../style/theme'
import { css } from '@emotion/react'
import { BookCover } from '../components/BookCover'

type Props = {
    detail: string
    id: string
    review: string
    reviewer: string
    title: string
    url: string
}

export const BookCard: React.FC<Props> = ({
    id,
    title,
    detail,
    review,
    reviewer,
}) => {
    return (
        <div css={styles.wrapper}>
            <p css={styles.reviewer}>{reviewer}</p>
            <h2 css={styles.review}>{review}</h2>
            <div css={styles.bookDetail}>
                <BookCover id={id} title={title} />
                <div css={styles.bookData}>
                    <p css={styles.title}>{title}</p>
                    <p css={styles.detail}>{detail}</p>
                </div>
            </div>
        </div>
    )
}

const breakpoints = Object.values(theme.breakpoints)
const mq = breakpoints.map((bp) => `@media (max-width: ${bp})`)

const styles = {
    wrapper: css({
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px 30px',
        border: '1px solid',
        borderRadius: theme.radius.md,
    }),
    review: css({
        display: '-webkit-box',
        fontSize: '1.2rem',
        overflow: 'hidden',
        '-webkitBoxOrient': 'vertical',
        '-webkitLineClamp': '2',
        marginBottom: '25px',
    }),
    bookDetail: css({
        display: 'flex',
        flexDirection: 'row',
        columnGap: '20px',
        backgroundColor: theme.defaultColors.gray[1],
        borderRadius: theme.radius.md,
        padding: '20px',
        [mq[1]]: { flexDirection: 'column', alignItems: 'center' },
    }),
    bookData: css({
        width: '100%',
    }),
    detail: css({
        display: '-webkit-box',
        overflow: 'hidden',
        '-webkitBoxOrient': 'vertical',
        '-webkitLineClamp': '3',
        fontSize: theme.fontSizes.sm,
        lineHeight: '1.2',
    }),
    title: css({
        fontSize: '1rem',
        fontWeight: '700',
    }),
    reviewer: css({
        fontSize: theme.fontSizes.sm,
        margin: '0',
    }),
}
