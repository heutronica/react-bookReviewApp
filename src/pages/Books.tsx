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
                    <div css={styles.heroHeader.wrapper}>
                        <div css={styles.heroHeader.titleWrapper}>
                            <p>本を読んだときの感情を共有しよう</p>
                            <h1 css={styles.title}>Favbook</h1>
                        </div>
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
    main: css({ padding: '0 0.5rem' }),
    wrapper: css({
        margin: '0 auto',
        maxWidth: theme.breakpoints.lg,
    }),
    heroHeader: {
        wrapper: css({
            border: theme.border.md,
            borderRadius: theme.radius.md,
            borderColor: theme.black,
            backgroundColor: theme.colors.primary.default,
            padding: '5rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            rowGap: '2rem',
        }),
        titleWrapper: css({
            position: 'relative',
            zIndex: '10',
            border: theme.border.md,
            borderRadius: theme.radius.md,
            borderColor: theme.black,
            backgroundColor: theme.paperWhite,
            padding: '3rem 1.5rem',

            '&::after': {
                content: 'close-quote',
                zIndex: '10',
                position: 'absolute',
                width: '30%',
                height: '90%',
                right: '-1rem',
                bottom: '-1rem',
                border: theme.border.md,
                borderRadius: theme.radius.md,
                borderColor: theme.black,
                backgroundColor: theme.paperWhite,
                //padding: '3rem 1.5rem',
            },
        }),
    },
    title: css({
        fontSize: 'clamp(2.5rem, 2.2rem + 4vw, 5rem)',
        lineHeight: '0.9',
    }),
    bookList: css({
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        paddingTop: '0.5rem',
        gap: '0.5rem',
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
