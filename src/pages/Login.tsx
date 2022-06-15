import React, { useState } from 'react'
import { Link, RouteProps, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../lib/AuthContextProvider'
import { Button } from '../components/Button'
import { TextInput } from '../components/TextInput'
import { PasswordInput } from '../components/PasswordInput'

import { css } from '@emotion/react'
import { theme, mq } from '../style/theme'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../lib/formSchema/loginSchema'
import { getLocationPathname } from '../lib/getLocationPathname'

export const Login = () => {
    const [statusMessage, setStatusMessage] = useState<APIStatus>({
        status: 'default',
        message: '',
    })

    // リダイレクト処理用

    const navigate = useNavigate()
    const location = useLocation()
    const auth = useAuth()

    const from = getLocationPathname(location)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<loginSchema>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = handleSubmit((values: loginSchema) => {
        fetch('https://api-for-missions-and-railways.herokuapp.com/signin', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
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
                response.json().then((data) => {
                    sessionStorage.setItem('auth.token', data.token)
                    auth.signIn(() => {
                        navigate(from, { replace: true })
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
            <div css={styles.wrapper}>
                <h1 css={styles.title}>Favbook</h1>
                <div css={styles.side.container}>
                    <div css={styles.side.title}>
                        <h2>ログイン</h2>
                        <p css={styles.side.guide}>
                            アカウントを持っていない場合は
                            <Link to="../SignUp">新規登録</Link>へ。
                        </p>
                    </div>
                    <div
                        css={[
                            styles.status.wrapper,
                            statusMessage.status == 'error'
                                ? styles.status.error
                                : styles.status.default,
                        ]}
                    >
                        <span>{statusMessage.message}</span>
                    </div>
                </div>
                <div css={styles.form.container}>
                    <form onSubmit={onSubmit} css={styles.form.wrapper}>
                        <TextInput
                            label="Email"
                            type="email"
                            placeholder="your@email.com"
                            errorMessage={errors.email?.message}
                            register={register('email')}
                        />
                        <PasswordInput
                            label="パスワード"
                            errorMessage={errors.password?.message}
                            register={register('password')}
                        />
                        <div>
                            <Button type="submit" size="lg">
                                ログイン
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
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
        gridTemplateColumns: '1fr clamp(200px, 60vw, 700px)',
        gridTemplateRows: '1fr',
        border: 'solid 2px',
        borderColor: theme.black,
        [mq[1]]: {
            gridTemplateColumns: '1fr',
        },
    }),
    title: css({
        gridColumn: '1/3',
        gridRow: '1/2',
        borderBottom: 'solid 1px',
        borderColor: theme.black,
        padding: '0.5rem 0',
        textAlign: 'center',
        backgroundColor: theme.colors.primary.default,
        color: theme.white,
        [mq[1]]: {
            gridColumn: '1/2',
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
            display: 'flex',
            justifyContent: 'center',
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
            gridRow: '2/3',
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
    },
}
