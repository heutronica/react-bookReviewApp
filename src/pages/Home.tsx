import { Button } from '../components/Button'
import { BookCard } from '../components/BookCard'
import { css } from '@emotion/react'
import { theme } from '../style/theme'

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
        <main css={styles.main}>
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
        padding: '50px 0',
    }),
    bookList: css({
        display: 'grid',
        padding: '0 30px',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        [mq[1]]: { gridTemplateColumns: '1fr' },
    }),
}
