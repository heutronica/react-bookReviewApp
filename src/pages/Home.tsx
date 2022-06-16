import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { BookCard } from '../components/BookCard'
import { Button } from '../components/Button'

import { css } from '@emotion/react'
import { theme } from '../style/theme'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

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
        const token = sessionStorage.getItem('auth.token')
        const getOffset = searchParams.get('offset')
        let bookAPIURL: string
        // 美しくないなあ
        if (!getOffset) {
            bookAPIURL = `https://api-for-missions-and-railways.herokuapp.com/books`
        } else {
            bookAPIURL = `https://api-for-missions-and-railways.herokuapp.com/books?offset=${getOffset}`
        }
        fetch(bookAPIURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then((response) => response.json())
            .then((response) => setBooks(response))
    }, ['', searchParams])

    return (
        <>
            <Header />
            <main css={styles.main}>
                <div css={styles.bookList}>
                    {books.map((props) => (
                        <BookCard {...props} key={props.id} />
                    ))}
                </div>
                <div css={styles.pageNav.wrapper}>
                    <div css={styles.pageNav.prev}>
                        {searchParams.get('offset') && (
                            <Button onClick={handlePrevPageChange}>PREV</Button>
                        )}
                    </div>
                    <div css={styles.pageNav.next}>
                        <Button onClick={handleNextPageChange}>NEXT</Button>
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
    bookList: css({
        margin: '0 auto',
        maxWidth: theme.breakpoints.lg,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '0.5rem',
        [mq[1]]: { gridTemplateColumns: '1fr' },
    }),
    pageNav: {
        wrapper: css({
            display: 'flex',
            flexBasis: 'auto',
            justifyContent: 'space-between',
            columnGap: '0.1rem',
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
