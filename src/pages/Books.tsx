import {
    Card,
    Container,
    Grid,
    Button,
    Text,
    Stack,
    Group,
    BackgroundImage,
} from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookCard } from '../components/BookCard'

interface Book {
    detail: string
    id: string
    review: string
    reviewer: string
    title: string
    url: string
}

type SignInResponse = {
    Success: {
        id: 'string'
        title: 'string'
        url: 'string'
        detail: 'string'
        review: 'string'
        reviewer: 'string'
        isMine: true
    }
    Error: {
        ErrorCode: number
        ErrorMessageJP: string
        ErrorMessageEN: string
    }
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

    const bookStyle = books.map(({ id, title, detail, reviewer }) => {
        return (
            <Grid.Col lg={6} sm={12} key={id}>
                <Card withBorder py={30} px={50}>
                    <Grid>
                        <Grid.Col md={4} xs={12}>
                            <BookCard id={id}>{title}</BookCard>
                        </Grid.Col>
                        <Grid.Col md={8} xs={12}>
                            <Group py={20} direction="column">
                                <Text size="xl" weight={700}>
                                    {title}
                                </Text>
                                <Text lineClamp={2}>{detail}</Text>
                            </Group>
                            <Text size="sm" color="#999">
                                {reviewer}
                            </Text>
                        </Grid.Col>
                    </Grid>
                </Card>
            </Grid.Col>
        )
    })

    return (
        <Container size="xl">
            <Stack>
                <BackgroundImage
                    src="src/img/top_img.png"
                    align="center"
                    py={100}
                    mb={50}
                >
                    <p>本を読んだときの感情を共有しよう</p>
                    <Text
                        weight={800}
                        sx={(theme) => ({
                            fontSize: '6rem',
                        })}
                    >
                        Favbook
                    </Text>
                    <Button<typeof Link>
                        component={Link}
                        to="/signup"
                        size="lg"
                    >
                        無料ではじめる
                    </Button>
                </BackgroundImage>
            </Stack>
            <Grid gutter="xl">{bookStyle}</Grid>
        </Container>
    )
}
