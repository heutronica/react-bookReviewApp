import { theme, mq } from '../style/theme'
import { css } from '@emotion/react'
import { BookCover } from '../components/BookCover'
import { useNavigate } from 'react-router-dom'
import { UserIcon } from '../components/UserIcon'

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
    const navigate = useNavigate()
    return (
        <div css={styles.wrapper}>
            <div css={styles.reviewer}>
                <UserIcon username={reviewer} size={30} />
                <p>{reviewer}</p>
            </div>
            <h2 css={styles.review}>{review}</h2>
            <div css={styles.bookData.wrapper}>
                <div
                    css={styles.bookCover}
                    onClick={() => navigate('/detail/' + id)}
                >
                    <BookCover id={id} title={title} />
                </div>
                <div css={styles.bookData.detailWrapper}>
                    <p css={styles.bookData.title}>{title}</p>
                    <p css={styles.bookData.detail}>{detail}</p>
                </div>
            </div>
        </div>
    )
}

const styles = {
    wrapper: css({
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
        rowGap: '1rem',
        justifyContent: 'space-between',
        padding: 'clamp(0.5rem, 3vw, 2rem)',
        border: '1px solid',
        borderColor: theme.black,
    }),
    review: css({
        display: '-webkit-box',
        fontSize: theme.fontSizes.lg,
        overflow: 'hidden',
        '-webkitBoxOrient': 'vertical',
        '-webkitLineClamp': '2',
    }),
    bookData: {
        wrapper: css({
            display: 'grid',
            gridTemplateColumns: 'auto 2fr',
            gridColumnGap: '20px',
            gridRowGap: '10px',

            backgroundColor: theme.defaultColors.gray[1],
            borderRadius: theme.radius.md,
            padding: '20px',
        }),
        detailWrapper: css({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            rowGap: '1rem',
        }),
        title: css({
            fontSize: '1rem',
            width: '100%',
            height: 'fit-content',
            fontWeight: '700',
            margin: '0',
            display: '-webkit-box',
            overflow: 'hidden',
            '-webkitBoxOrient': 'vertical',
            '-webkitLineClamp': '2',
        }),
        detail: css({
            display: '-webkit-box',
            height: 'fit-content',
            overflow: 'hidden',
            '-webkitBoxOrient': 'vertical',
            '-webkitLineClamp': '4',
            margin: '0',
            fontSize: theme.fontSizes.sm,
            lineHeight: '1.2',
        }),
    },
    bookCover: css({
        display: 'flex',
        alignItems: 'center',
        width: 'clamp(70px, 10vw, 120px)',
        cursor: 'pointer',
        [mq[0]]: {
            display: 'none',
        },
    }),

    reviewer: css({
        display: 'flex',
        columnGap: '0.8rem',
        alignItems: 'center',
        margin: '0',
        '> p': {
            fontSize: theme.fontSizes.sm,
        },
    }),
}
