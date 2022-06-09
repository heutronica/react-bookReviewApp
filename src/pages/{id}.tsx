import { theme } from '../style/theme'
import { css } from '@emotion/react'
import { BookCover } from '../components/BookCover'
import { Button } from '../components/Button'
import { Title } from '../components/Title'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LinkButton } from '../components/LinkButton'
import { UserIcon } from '../components/UserIcon'

interface Book {
    id: 'string'
    title: 'string'
    url: 'string'
    detail: 'string'
    review: 'string'
    reviewer: 'string'
    isMine: true
}

export const Detail = () => {
    const [books, setBooks] = useState<Book>()
    const getId = useParams()

    useEffect(() => {
        const bookAPIURL =
            'https://api-for-missions-and-railways.herokuapp.com/books/' +
            getId.booksId
        const token = sessionStorage.getItem('auth.token')
        fetch(bookAPIURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then((response) => response.json())
            .then((response) => setBooks(response))
    }, [''])

    if (books === undefined) {
        return <p>loading</p>
    }

    return (
        <main css={styles.main}>
            <div css={styles.wrapper}>
                <div css={styles.subColumn}>
                    <BookCover id={books.id} title={books.title} />
                    <LinkButton to={books.url} size="sm">
                        購入する
                    </LinkButton>
                </div>
                <div css={styles.mainColumn}>
                    <div css={styles.bookDetail}>
                        <Title size="2">{books.title}</Title>
                        <p css={styles.bookDetailText}>{books.detail}</p>
                    </div>
                    <div css={styles.review}>
                        <div css={styles.reviewHeader}>
                            <div css={styles.reviewer}>
                                <UserIcon username={books.reviewer} size={30} />
                                {books.reviewer}
                            </div>
                            {books?.isMine && (
                                <Button size="sm">編集画面</Button>
                            )}
                        </div>
                        <p>{books.review}</p>
                    </div>
                </div>
            </div>
        </main>
    )
}

const breakpoints = Object.values(theme.breakpoints)
const mq = breakpoints.map((bp) => `@media (max-width: ${bp})`)

const styles = {
    main: css({
        padding: '50px 30px',
    }),
    wrapper: css({
        display: 'flex',
        margin: '0 auto',
        maxWidth: theme.breakpoints.lg,
        columnGap: '80px',
        [mq[1]]: { flexDirection: 'column', alignItems: 'center' },
    }),
    mainColumn: css({
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }),
    subColumn: css({
        display: 'flex',
        flexDirection: 'column',
        width: '200px',
        rowGap: '10px',
    }),
    bookDetail: css({
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.defaultColors.gray[1],
        borderRadius: theme.radius.md,
        padding: '40px 50px',
        marginBottom: '30px',
    }),
    bookDetailText: css({
        display: '-webkit-box',
        height: 'fit-content',
        overflow: 'hidden',
        '-webkitBoxOrient': 'vertical',
        '-webkitLineClamp': '4',
        margin: '0',
        fontSize: theme.fontSizes.sm,
        lineHeight: '1.2',
    }),
    review: css({
        padding: '30px 50px',
        border: '1px solid',
        borderRadius: theme.radius.md,
        borderColor: theme.colors.lightShade,
    }),
    reviewHeader: css({
        display: 'flex',
        justifyContent: 'space-between',
    }),
    reviewer: css({
        display: 'flex',
        alignItems: 'center',
        columnGap: '10px',
    }),
}
