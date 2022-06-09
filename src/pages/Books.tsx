import React, { useEffect, useState } from 'react'
import { LinkButton } from '../components/LinkButton'
import { BookCard } from '../components/BookCard'
import { css } from '@emotion/react'
import { theme } from '../style/theme'

interface Book {
    detail: string
    id: string
    review: string
    reviewer: string
    title: string
    url: string
}

export const Books = () => {
    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        fetch(
            'https://api-for-missions-and-railways.herokuapp.com/public/books',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((response) => response.json())
            .then((response) => setBooks(response))
    }, [''])

    return (
        <main css={styles.main}>
            <div css={styles.heroHeader}>
                <p>本を読んだときの感情を共有しよう</p>
                <h1 css={styles.title}>Favbook</h1>
                <LinkButton to="/signup" rounded>
                    無料ではじめる
                </LinkButton>
            </div>
            <div css={styles.bookList}>
                {books.map((props) => (
                    <BookCard {...props} key={props.id} />
                ))}
            </div>
        </main>
    )
}

const breakpoints = Object.values(theme.breakpoints)
const mq = breakpoints.map((bp) => `@media (max-width: ${bp})`)

const styles = {
    main: css({
        maxWidth: theme.breakpoints.lg,
        margin: '0 auto',
    }),
    heroHeader: css({
        backgroundImage: `url("src/img/top_img.png")`,
        backgroundSize: 'cover',
        padding: '100px 50px',
        textAlign: 'center',
    }),
    title: css({
        fontSize: '5rem',
    }),
    bookList: css({
        display: 'grid',
        padding: '0 30px',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        [mq[1]]: { gridTemplateColumns: '1fr' },
    }),
}
