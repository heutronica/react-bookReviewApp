import React, { useEffect, useState } from 'react'
import {
    useSearchParams,
    useParams,
    createSearchParams,
} from 'react-router-dom'

import { LinkButton } from '../components/LinkButton'
import { Button } from '../components/Button'
import { BookCard } from '../components/BookCard'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

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
    const [searchParams, setSearchParams] = useSearchParams()

    const handleNextPageChange = () => {
        const offset = Number(searchParams.get('offset'))
        if (!offset) return setSearchParams({ offset: '10' })
        setSearchParams({ offset: (offset + 10).toString() })
    }

    const handlePrevPageChange = () => {
        const offset = Number(searchParams.get('offset'))
        if (!offset || offset <= 10) return setSearchParams({})
        setSearchParams({ offset: (offset - 10).toString() })
    }

    useEffect(() => {
        const getOffset = searchParams.get('offset')
        let bookAPIURL: string
        // 美しくないなあ
        if (!getOffset) {
            bookAPIURL = `https://api-for-missions-and-railways.herokuapp.com/public/books`
        } else {
            bookAPIURL = `https://api-for-missions-and-railways.herokuapp.com/public/books?offset=${getOffset}`
        }
        fetch(bookAPIURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((response) => setBooks(response))
    }, ['', searchParams])

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
                    <div css={styles.pageNav.wrapper}>
                        <div css={styles.pageNav.prev}>
                            {searchParams.get('offset') && (
                                <Button onClick={handlePrevPageChange}>
                                    PREV
                                </Button>
                            )}
                        </div>
                        <div css={styles.pageNav.next}>
                            <Button onClick={handleNextPageChange}>NEXT</Button>
                        </div>
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
        gap: '1rem',
        [mq[1]]: { gridTemplateColumns: '1fr' },
    }),
    pageNav: {
        wrapper: css({
            display: 'flex',
            flexBasis: 'auto',
            justifyContent: 'space-between',
            columnGap: '1rem',
            padding: '2rem 0',

            [mq[0]]: {
                padding: '',
            },
        }),
        prev: css({
            width: '100%',
            textAlign: 'right',
        }),
        next: css({
            width: '100%',
            textAlign: 'left',
        }),
    },
}
