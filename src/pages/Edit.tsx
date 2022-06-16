import { useState, useEffect } from 'react'
import { Button } from '../components/Button'
import { TextInput } from '../components/TextInput'
import { TextArea } from '../components/TextArea'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import { css } from '@emotion/react'
import { theme, mq } from '../style/theme'

import { useParams, useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { bookPostSchema } from '../lib/formSchema/bookPostSchema'
import { useCallback } from 'react'

interface Book {
    id: 'string'
    title: 'string'
    url: 'string'
    detail: 'string'
    review: 'string'
    reviewer: 'string'
    isMine: true
}

export const Edit = () => {
    const getId = useParams()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<bookPostSchema>({
        resolver: zodResolver(bookPostSchema),
    })
    const [statusMessage, setStatusMessage] = useState<APIStatus>({
        status: 'default',
        message: '',
    })

    const token = sessionStorage.getItem('auth.token')
    const bookAPIURL =
        'https://api-for-missions-and-railways.herokuapp.com/books/' +
        getId.booksId

    const loadBookData = useCallback(async () => {
        const bookData = await fetch(bookAPIURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        }).then((response) => response.json())
        reset(bookData)
    }, [reset])

    useEffect(() => {
        loadBookData()
    }, [''])

    const onSubmit = handleSubmit((values: bookPostSchema) => {
        fetch(bookAPIURL, {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    response.json().then((data: BooksAPI.Error) => {
                        setStatusMessage({
                            status: 'error',
                            message: data.ErrorMessageJP,
                        })
                    })
                    return
                }
                setStatusMessage({
                    status: 'success',
                    message: '編集しました！',
                })
            })
            .catch(() => {
                setStatusMessage({
                    status: 'error',
                    message: 'おや！なんらかのエラーが発生しました',
                })
            })
    })

    const navigate = useNavigate()

    const submitDelete = () => {
        fetch(bookAPIURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    response.json().then((data: BooksAPI.Error) => {
                        setStatusMessage({
                            status: 'error',
                            message: data.ErrorMessageJP,
                        })
                    })
                    return
                }
                setStatusMessage({
                    status: 'success',
                    message: '削除しました',
                })
                navigate('/protected')
            })
            .catch(() => {
                setStatusMessage({
                    status: 'error',
                    message: 'おや！なんらかのエラーが発生しました',
                })
            })
    }

    return (
        <>
            <Header />
            <main css={styles.main}>
                <div css={styles.wrapper}>
                    <div css={styles.side.container}>
                        <div css={styles.side.title}>
                            <h2>レビュー編集</h2>
                        </div>
                        <div
                            css={[
                                styles.status.wrapper,
                                statusMessage.status == 'error' &&
                                    styles.status.error,
                                statusMessage.status == 'success' &&
                                    styles.status.success,
                                statusMessage.status == 'default' &&
                                    styles.status.default,
                            ]}
                        >
                            <span>{statusMessage.message}</span>
                        </div>
                    </div>
                    <div css={styles.form.container}>
                        <form
                            method="post"
                            onSubmit={onSubmit}
                            css={styles.form.wrapper}
                        >
                            <TextInput
                                label="書籍名"
                                type="text"
                                errorMessage={errors.title?.message}
                                register={register('title')}
                            />
                            <TextInput
                                label="URL"
                                type="text"
                                placeholder="https://xxx.xxx/"
                                errorMessage={errors.url?.message}
                                register={register('url')}
                            />
                            <TextArea
                                label="あらすじ"
                                type="text"
                                errorMessage={errors.detail?.message}
                                register={register('detail')}
                            />
                            <TextArea
                                label="レビュー"
                                type="text"
                                errorMessage={errors.review?.message}
                                register={register('review')}
                            />
                            <div css={styles.form.onSubmit}>
                                <Button type="submit" size="lg">
                                    修正
                                </Button>
                                <Button
                                    onClick={() => submitDelete()}
                                    size="lg"
                                >
                                    削除
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

const styles = {
    main: css({
        margin: 'auto 0',
        padding: ' 1.2rem',
        [mq[1]]: {
            margin: '0',
        },
    }),
    wrapper: css({
        display: 'grid',
        margin: '0 auto',
        maxWidth: theme.breakpoints.lg,
        gridTemplateColumns: '1fr clamp(200px, 70vw, 800px)',
        gridTemplateRows: '1fr',
        border: theme.border.md,
        borderRadius: theme.radius.md,
        backgroundColor: theme.white,
        borderColor: theme.black,
        [mq[1]]: {
            gridTemplateColumns: '1fr',
        },
    }),
    side: {
        container: css({
            gridColumn: '1/2',
            display: 'grid',
            gridTemplateRows: '2fr 1fr',
            borderRight: 'solid 1px',
            borderColor: theme.black,
            [mq[1]]: {
                gridRow: '2/3',
                gridTemplateRows: '1fr',
                borderRight: 'none',
                borderBottom: 'solid 1px',
            },
        }),
        title: css({
            padding: '2rem',
            gridRow: '1/2',
            display: 'flex',
            flexDirection: 'column',
        }),
        guide: css({
            color: theme.colors.medium.default,
            marginTop: '1rem',
            fontSize: theme.fontSizes.sm,
        }),
    },
    form: {
        container: css({
            display: 'flex',
            alignItems: 'center',
            gridColumn: '2/3',
            padding: '2rem',
            [mq[1]]: {
                gridColumn: '1/2',
                gridRow: '3/4',
            },
        }),
        wrapper: css({
            display: 'grid',
            width: '100%',
            rowGap: '2rem',
        }),
        password: css({
            display: 'grid',
            rowGap: '0.5rem',
        }),
        onSubmit: css({
            display: 'flex',
            columnGap: '1rem',
            [mq[0]]: {
                flexDirection: 'column',
                rowGap: '1rem',
            },
        }),
    },
    status: {
        wrapper: css({
            gridRow: '2/3',
            width: '100%',
            padding: '2rem',
        }),
        default: css({
            [mq[1]]: {
                display: 'none',
            },
        }),
        error: css({
            display: 'flex',
            alignItems: 'center',
            backgroundColor: theme.colors.danger.shade,
            borderTop: 'solid 1px',
            borderColor: theme.black,
            color: theme.white,
        }),
        success: css({
            display: 'flex',
            alignItems: 'center',
            borderTop: 'solid 1px',
            borderColor: theme.black,
            backgroundColor: theme.colors.success.shade,
            color: theme.colors.success.light,
        }),
    },
}
