import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../lib/AuthContextProvider'
import { Button } from '../components/Button'
import { TextInput } from '../components/TextInput'
import { PasswordInput } from '../components/PasswordInput'

import { css } from '@emotion/react'
import { theme, mq } from '../style/theme'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { signupSchema } from '../lib/formSchema/signupSchema'
import { getLocationPathname } from '../lib/getLocationPathname'

export const SignUp = () => {
    const [statusMessage, setStatusMessage] = useState<APIStatus>({
        status: 'default',
        message: '',
    })

    const navigate = useNavigate()
    const location = useLocation()
    const auth = useAuth()

    const from = getLocationPathname(location)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<signupSchema>({
        resolver: zodResolver(signupSchema),
    })

    const onSubmit = handleSubmit((values: signupSchema) => {
        const userData = {
            name: values.name,
            email: values.email,
            password: values.password,
        }

        fetch('https://api-for-missions-and-railways.herokuapp.com/users', {
            method: 'POST',
            body: JSON.stringify(userData),
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
                        <h2>新規ユーザー登録</h2>
                        <p css={styles.side.guide}>
                            すでにアカウントを持っている場合は
                            <Link to="../login">ログイン</Link> へ。
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
                            label="ユーザーネーム"
                            type="text"
                            placeholder="はなまる太郎"
                            errorMessage={errors.name?.message}
                            register={register('name')}
                        />
                        <TextInput
                            label="Email"
                            type="email"
                            placeholder="your@email.com"
                            errorMessage={errors.email?.message}
                            register={register('email')}
                        />
                        <div css={styles.form.password}>
                            <PasswordInput
                                label="パスワード"
                                errorMessage={errors.password?.message}
                                register={register('password')}
                            />
                            <PasswordInput
                                placeholder="確認用パスワード"
                                errorMessage={errors.passwordConfirm?.message}
                                register={register('passwordConfirm')}
                            />
                        </div>
                        <div>
                            <Button type="submit" size="lg">
                                登録する
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
        backgroundColor: theme.colors.primary,
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
            color: theme.colors.medium,
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
            backgroundColor: theme.colors.dangerShade,
            borderTop: 'solid 1px',
            borderColor: theme.black,
            color: theme.white,
        }),
    },
}
