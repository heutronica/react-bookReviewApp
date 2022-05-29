import { Card, Container, Grid, Paper } from '@mantine/core'
import React, { useEffect, useState } from 'react'

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

    const token = sessionStorage.getItem('token')

    useEffect(() => {
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

    const bookStyle = books.map(({ id, title, detail }) => {
        return (
            <Grid.Col span={6}>
                <Paper withBorder key={id}>
                    <div>
                        <h3 className="bookTitle">{title}</h3>
                        <p className="bookDetail">{detail}</p>
                    </div>
                </Paper>
            </Grid.Col>
        )
    })

    return (
        <Container size="lg">
            <h2>ログインができました！</h2>
            <Grid gutter="xl">{bookStyle}</Grid>
        </Container>
    )
}
