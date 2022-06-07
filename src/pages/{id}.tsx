import { theme } from '../style/theme'
import { css } from '@emotion/react'
import { BookCover } from '../components/BookCover'
import { Button } from '../components/Button'

import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

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
    const bookAPIURL =
        'https://api-for-missions-and-railways.herokuapp.com/books/' +
        getId.booksId

    useEffect(() => {
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

    return (
        <div>
            {/*<BookCover id={books.id} title={books.title} />*/}
            {books?.isMine && <Button>編集画面</Button>}
        </div>
    )
}
