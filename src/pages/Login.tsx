import React, { useState } from 'react'
import { Link, RouteProps, useLocation, useNavigate } from 'react-router-dom'

import {
    Container,
    Paper,
    TextInput,
    Button,
    PasswordInput,
    Group,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { z } from 'zod'
import { TextInputError } from '../components/TextInputError'

import { useAuth } from '../lib/AuthContextProvider'

// 認証処理用

type SignInResponse = {
    Success: {
        token: string
    }
    Error: {
        ErrorCode: number
        ErrorMessageJP: string
        ErrorMessageEN: string
    }
}

const UserSchema = z.object({
    email: z.string().email({ message: '無効なメールアドレスです' }),
    password: z.string().min(1, { message: 'パスワードを入力してください' }),
})

type User = z.infer<typeof UserSchema>

// Loginコンポーネント

export const Login: React.FC<RouteProps> = () => {
    const [errorStatus, setErrorStatus] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    // リダイレクト処理用

    const navigate = useNavigate()
    const location = useLocation()
    const auth = useAuth()

    const from = location.state?.from?.pathname || '/'

    const form = useForm({
        schema: zodResolver(UserSchema),
        initialValues: {
            email: '',
            password: '',
        },
    })

    const requestLogin = (values: User) => {
        setErrorStatus(false)

        fetch('https://api-for-missions-and-railways.herokuapp.com/signin', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    response.json().then((data: SignInResponse['Error']) => {
                        setErrorMessage(data.ErrorMessageJP)
                        setErrorStatus(true)
                    })
                    return
                }
                response.json().then((data: SignInResponse['Success']) => {
                    sessionStorage.setItem('auth.token', data.token)
                    auth.signIn(() => {
                        navigate(from, { replace: true })
                    })
                })
            })
            .catch(() => {
                setErrorMessage('おや！なんらかのエラーが発生しました')
                setErrorStatus(true)
            })
    }

    return (
        <Container size="xs">
            <Paper shadow="xs" radius="md" px={50} py={30} withBorder>
                <h2>Login</h2>
                {errorStatus && <TextInputError>{errorMessage}</TextInputError>}
                <form
                    onSubmit={form.onSubmit((values) => requestLogin(values))}
                >
                    <TextInput
                        required
                        label="Email"
                        placeholder="your@email.com"
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        mt="md"
                        required
                        label="パスワード"
                        placeholder="Password"
                        {...form.getInputProps('password')}
                    />
                    <Group mt="md">
                        <Button fullWidth type="submit">
                            ログイン
                        </Button>
                    </Group>
                </form>
            </Paper>
            <Paper shadow="xs" radius="md" px={50} py={20} mt="lg" withBorder>
                アカウントを持っていない場合は
                <Link to="../SignUp">新規登録</Link>へ。
            </Paper>
        </Container>
    )
}
