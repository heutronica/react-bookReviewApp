import React, { Suspense, useState } from 'react'
import { useAuth } from '../lib/AuthContextProvider'
import { TextInput, Button, Container, Paper, Group } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { z } from 'zod'
import { TextInputError } from '../components/TextInputError'

type UsersResponse = {
    Success: {
        name: string
    }
    Error: {
        ErrorCode: number
        ErrorMessageJP: string
        ErrorMessageEN: string
    }
}

const UserSchema = z.object({
    name: z
        .string()
        .min(1, { message: '名前が入力されていません' })
        .max(20, { message: '名前は20文字以下にしてください' }),
})

type User = z.infer<typeof UserSchema>

export const Profile = () => {
    const [errorStatus, setErrorStatus] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const auth = useAuth()

    const form = useForm({
        schema: zodResolver(UserSchema),
        initialValues: {
            name: auth.getName(),
        },
    })

    const requestPOSTUser = (values: User) => {
        setErrorStatus(false)
        const token = sessionStorage.getItem('auth.token')
        fetch('https://api-for-missions-and-railways.herokuapp.com/users', {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
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
                    auth.updateName(data.name)
                })
            })
            .catch(() => {
                setErrorMessage('おや！なんらかのエラーが発生しました')
                setErrorStatus(true)
            })
    }

    return (
        <Container size="xs">
            <Paper radius="md" px={50} py={30} withBorder>
                <h2>プロフィール</h2>
                {errorStatus && <TextInputError>{errorMessage}</TextInputError>}
                <Suspense fallback={<p>loading</p>}>
                    <form
                        onSubmit={form.onSubmit((values) =>
                            requestPOSTUser(values)
                        )}
                    >
                        <TextInput
                            label="name"
                            {...form.getInputProps('name')}
                        />
                        <Group mt="md">
                            <Button fullWidth type="submit">
                                変更
                            </Button>
                        </Group>
                    </form>
                </Suspense>
            </Paper>
        </Container>
    )
}
