import React, { useState } from 'react'
import { Link, RouteProps } from 'react-router-dom'

import {
    Container,
    Paper,
    TextInput,
    Button,
    PasswordInput,
    Group,
    Alert,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { z } from 'zod'

import { TextInputError } from '../components/TextInputError'

type UsersResponse = {
    Success: {
        token: string
    }
    Error: {
        ErrorCode: number
        ErrorMessageJP: string
        ErrorMessageEN: string
    }
}

const UserSchema = z
    .object({
        name: z
            .string()
            .min(1, { message: '名前が入力されていません' })
            .max(20, { message: '名前は20文字以下にしてください' }),
        email: z.string().email({ message: '無効なメールアドレスです' }),
        password: z
            .string()
            .min(8, { message: 'パスワードは最低でも8文字以上にしてください' })
            .regex(/[A-Za-z]+[0-9]/, {
                message:
                    '英字・数字それぞれ最低1文字ずつを含むものにしてください',
            }),
        passwordConfirm: z
            .string()
            .min(1, { message: '確認用パスワードを入力してください' }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: 'パスワードが一致しません',
        path: ['passwordConfirm'],
    })

type UserSchema = z.infer<typeof UserSchema>

export const SignUp: React.FC<RouteProps> = () => {
    const [errorStatus, setErrorStatus] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const form = useForm({
        schema: zodResolver(UserSchema),
        initialValues: {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
    })

    const requestPOSTUser = (values: UserSchema) => {
        setErrorStatus(false)

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
                    response.json().then((data: UsersResponse['Error']) => {
                        setErrorMessage(data.ErrorMessageJP)
                        setErrorStatus(true)
                    })
                    return
                }
                response.json().then((data: UsersResponse['Success']) => {
                    sessionStorage.setItem('token', data.token)
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
                <h2>Sign up</h2>
                {errorStatus && <TextInputError>{errorMessage}</TextInputError>}
                <form
                    onSubmit={form.onSubmit((values) =>
                        requestPOSTUser(values)
                    )}
                >
                    <TextInput
                        required
                        label="name"
                        placeholder="お名前"
                        {...form.getInputProps('name')}
                    />
                    <TextInput
                        mt="md"
                        required
                        label="email"
                        placeholder="your@email.com"
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        mt="md"
                        required
                        label="パスワード"
                        placeholder="パスワード"
                        {...form.getInputProps('password')}
                    />
                    <PasswordInput
                        mt="sm"
                        required
                        placeholder="確認用パスワード"
                        {...form.getInputProps('passwordConfirm')}
                    />
                    <Group mt="md">
                        <Button fullWidth type="submit">
                            新規登録
                        </Button>
                    </Group>
                </form>
            </Paper>
            <Paper shadow="xs" radius="md" px={50} py={20} mt="lg" withBorder>
                すでにアカウントを持っている場合は
                <Link to="../login">ログイン</Link> へ。
            </Paper>
        </Container>
    )
}
