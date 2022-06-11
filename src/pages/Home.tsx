import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { BookCard } from '../components/BookCard'

import { css } from '@emotion/react'
import { theme } from '../style/theme'

import { useEffect, useState } from 'react'

interface Book {
    detail: string
    id: string
    review: string
    reviewer: string
    title: string
    url: string
}

export const Home = () => {
    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        const token = sessionStorage.getItem('auth.token')
        fetch('https://api-for-missions-and-railways.herokuapp.com/books', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then((response) => response.json())
            .then((response) => setBooks(response))
    }, [''])

    return (
        <>
            <Header />
            <main css={styles.main}>
                <div css={styles.bookList}>
                    {books.map((props) => (
                        <BookCard {...props} key={props.id} />
                    ))}
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

    bookList: css({
        margin: '0 auto',
        maxWidth: theme.breakpoints.lg,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        [mq[1]]: { gridTemplateColumns: '1fr' },
    }),
}
