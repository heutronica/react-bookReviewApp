import React, { useState } from 'react'
import { Link, RouteProps, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../lib/AuthContextProvider'
import { Button } from '../components/Button'
import { TextInput } from '../components/TextInput'
import { Title } from '../components/Title'

import { css } from '@emotion/react'
import { theme } from '../style/theme'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../lib/formSchema/loginSchema'
import { getLocationPathname } from '../lib/getLocationPathname'

export const Login = () => {
    const [statusMessage, setStatusMessage] = useState<APIStatus>({
        status: '',
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
            <Title size="2">ログイン</Title>
            {statusMessage.status == 'error' && (
                <p css={[styles.status.wrapper, styles.status.error]}>
                    {statusMessage.message}
                </p>
            )}
            <form onSubmit={onSubmit} css={styles.form.wrapper}>
                <TextInput
                    label="Email"
                    name="email"
                    placeholder="your@email.com"
                    errorMessage={errors.email?.message}
                    register={register('email')}
                />
                <TextInput
                    label="パスワード"
                    name="password"
                    errorMessage={errors.password?.message}
                    register={register('password')}
                />
                <div css={styles.form.button}>
                    <Button type="submit" size="lg">
                        ログイン
                    </Button>
                </div>
            </form>
            <div>
                アカウントを持っていない場合は
                <Link to="../SignUp">新規登録</Link>へ。
            </div>
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
    },
}
