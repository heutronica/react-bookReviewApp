import { useState } from 'react'
import { Button } from '../components/Button'
import { TextInput } from '../components/TextInput'
import { TextArea } from '../components/TextArea'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import { css } from '@emotion/react'
import { theme, mq } from '../style/theme'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { bookPostSchema } from '../lib/formSchema/bookPostSchema'

export const New = () => {
    const [statusMessage, setStatusMessage] = useState<APIStatus>({
        status: 'default',
        message: '',
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<bookPostSchema>({
        resolver: zodResolver(bookPostSchema),
    })

    const onSubmit = handleSubmit((values: bookPostSchema) => {
        const token = sessionStorage.getItem('auth.token')

        fetch('https://api-for-missions-and-railways.herokuapp.com/books', {
            method: 'POST',
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
                response.json().then(() => {
                    setStatusMessage({
                        status: 'success',
                        message: '投稿しました！',
                    })
                })
            })
            .catch(() => {
                setStatusMessage({
                    status: 'error',
                    message: 'おや！なんらかのエラーが発生しました',
                })
            })
    })

    return (
        <>
            <Header />
            <main css={styles.main}>
                <div css={styles.wrapper}>
                    <div css={styles.side.container}>
                        <div css={styles.side.title}>
                            <h2>レビュー投稿</h2>
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
                            <div>
                                <Button type="submit" size="lg">
                                    投稿する
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
            //justifyContent: '',
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
