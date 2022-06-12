import { theme, mq } from '../style/theme'
import { css } from '@emotion/react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { BookCover } from '../components/BookCover'
import { Button } from '../components/Button'

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
    const navigate = useNavigate()

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
        <>
            <Header />
            <main css={styles.main}>
                <div css={styles.wrapper}>
                    <div css={styles.title}>
                        <h2>{books.title}</h2>
                        {books?.isMine && (
                            <Button
                                size="sm"
                                onClick={() => navigate('/edit/' + books.id)}
                            >
                                編集画面
                            </Button>
                        )}
                    </div>
                    <div css={styles.subColumn}>
                        <div>
                            <BookCover id={books.id} title={books.title} />
                        </div>
                        <LinkButton to={books.url} size="sm">
                            購入する
                        </LinkButton>
                    </div>
                    <div css={styles.mainColumn}>
                        <div css={styles.review}>
                            <div css={styles.reviewer}>
                                <UserIcon username={books.reviewer} size={30} />
                                {books.reviewer}
                            </div>
                            <p>{books.review}</p>
                        </div>
                        <div css={styles.bookDetail.wrapper}>
                            <p css={styles.bookDetail.head}>本の概要</p>
                            <p css={styles.bookDetail.text}>{books.detail}</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

const styles = {
    main: css({
        padding: '40px 1.2rem',
        [mq[0]]: {
            padding: '50px 0',
        },
    }),
    wrapper: css({
        display: 'grid',
        gridTemplateColumns: '200px 1fr',
        margin: '0 auto',
        maxWidth: theme.breakpoints.lg,
        columnGap: '50px',
        rowGap: '40px',
        [mq[1]]: {
            gridTemplateColumns: '1fr',
        },
    }),
    title: css({
        gridColumn: '1 / 3',
        display: 'flex',
        alignItems: 'center',
        borderBottom: 'solid 1px',
        borderColor: theme.black,
        paddingBottom: '1rem',
        [mq[1]]: {
            gridColumn: '1 / 2',
            flexDirection: 'column',
        },
    }),
    mainColumn: css({
        gridColumn: '2 / 3',
        display: 'flex',
        width: '100%',
        rowGap: '20px',
        flexDirection: 'column',
        justifyContent: 'space-between',
        [mq[1]]: {
            gridColumn: '1 / 2',
        },
    }),
    subColumn: css({
        gridColumn: '1 / 2',
        display: 'flex',
        flexDirection: 'column',
        width: '200px',
        rowGap: '10px',
        [mq[1]]: {
            gridColumn: '1 / 2',
            margin: '0 auto',
        },
    }),
    bookDetail: {
        wrapper: css({
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.defaultColors.gray[1],
            borderRadius: theme.radius.md,
            padding: '40px clamp(2rem, 5vw, 4rem)',

            [mq[0]]: {
                borderRadius: '0',
            },
        }),
        head: css({ marginBottom: '20px' }),
        text: css({
            height: 'fit-content',
            fontSize: theme.fontSizes.sm,
            lineHeight: '1.7',
        }),
    },
    review: css({
        display: 'flex',
        flexDirection: 'column',
        padding: '3vh clamp(1rem, 5vw, 4rem)',
        border: '1px solid',
        borderColor: theme.black,
        rowGap: '30px',
        [mq[0]]: {
            margin: '0 1rem',
        },
    }),
    reviewer: css({
        display: 'flex',
        alignItems: 'center',
        columnGap: '15px',
        fontSize: theme.fontSizes.sm,
    }),
}
