import React, { useEffect, useState } from 'react'
import { LinkButton } from '../components/LinkButton'
import { BookCard } from '../components/BookCard'
import { css } from '@emotion/react'
import { theme } from '../style/theme'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

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
        <>
            <Header />
            <main css={styles.main}>
                <div css={styles.wrapper}>
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
                </div>
            </main>
            <Footer />
        </>
    )
}

const breakpoints = Object.values(theme.breakpoints)
const mq = breakpoints.map((bp) => `@media (max-width: ${bp})`)

const styles = {
    main: css({ padding: '0 1.2rem' }),
    wrapper: css({
        margin: '0 auto',
        maxWidth: theme.breakpoints.lg,
    }),
    heroHeader: css({
        backgroundImage: `url("src/img/top_img.png")`,
        backgroundSize: 'cover',
        padding: '100px 0px',
        textAlign: 'center',
    }),
    title: css({
        fontSize: 'clamp(2.5rem, 2.2rem + 4vw, 5rem)',
        lineHeight: '0.9',
    }),
    bookList: css({
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        [mq[1]]: { gridTemplateColumns: '1fr' },
    }),
}
