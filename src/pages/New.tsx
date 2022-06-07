import { useState } from 'react'
import { Button } from '../components/Button'
import { TextInput } from '../components/TextInput'
import { TextArea } from '../components/TextArea'
import { Title } from '../components/Title'

import { css } from '@emotion/react'
import { theme } from '../style/theme'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { bookPostSchema } from '../lib/formSchema/bookPostSchema'

export const New = () => {
    const [statusMessage, setStatusMessage] = useState<APIStatus>({
        status: '',
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
        <main css={styles.main}>
            <Title size="2">レビュー投稿</Title>
            {statusMessage.status == 'success' && (
                <p css={[styles.status.wrapper, styles.status.success]}>
                    {statusMessage.message}
                </p>
            )}
            {statusMessage.status == 'error' && (
                <p css={[styles.status.wrapper, styles.status.error]}>
                    {statusMessage.message}
                </p>
            )}
            <form method="post" onSubmit={onSubmit} css={styles.form.wrapper}>
                <TextInput
                    label="書籍名"
                    name="title"
                    errorMessage={errors.title?.message}
                    register={register('title')}
                />
                <TextInput
                    label="URL"
                    name="url"
                    placeholder="https://xxx.xxx/"
                    errorMessage={errors.url?.message}
                    register={register('url')}
                />
                <TextArea
                    label="あらすじ"
                    name="detail"
                    errorMessage={errors.detail?.message}
                    register={register('detail')}
                />
                <TextArea
                    label="レビュー"
                    name="review"
                    errorMessage={errors.review?.message}
                    register={register('review')}
                />
                <div css={styles.form.button}>
                    <Button type="submit" size="lg">
                        投稿する
                    </Button>
                </div>
            </form>
        </main>
    )
}

const styles = {
    main: css({
        maxWidth: theme.breakpoints.md,
        margin: '0 auto',
        padding: '50px 0',
    }),
    form: {
        wrapper: css({
            display: 'grid',
            rowGap: '20px',
        }),
        button: css({}),
    },
    status: {
        wrapper: css({
            padding: '20px',
            borderRadius: theme.radius.md,
        }),
        error: css({
            backgroundColor: theme.colors.dangerLight,
            color: theme.colors.dangerShade,
        }),
        success: css({
            backgroundColor: theme.colors.successLight,
            color: theme.colors.successShade,
        }),
    },
}
