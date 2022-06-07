import { useState } from 'react'
import { useAuth } from '../lib/AuthContextProvider'
import { Button } from '../components/Button'
import { TextInput } from '../components/TextInput'
import { Title } from '../components/Title'

import { css } from '@emotion/react'
import { theme } from '../style/theme'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { nameSchema } from '../lib/formSchema/nameSchema'

export const Profile = () => {
    const [statusMessage, setStatusMessage] = useState<APIStatus>({
        status: '',
        message: '',
    })

    const auth = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<nameSchema>({
        resolver: zodResolver(nameSchema),
        defaultValues: {
            name: auth.getName(),
        },
    })

    const onSubmit = handleSubmit((values: nameSchema) => {
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
                    response.json().then((data: BooksAPI.Error) => {
                        setStatusMessage({
                            status: 'error',
                            message: data.ErrorMessageJP,
                        })
                    })
                    return
                }
                response.json().then((data) => {
                    auth.updateName(data.name)
                    setStatusMessage({
                        status: 'success',
                        message: '名前を変更しました！',
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
            <Title size="2">ユーザーネーム変更</Title>
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
                    label="ユーザーネーム"
                    name="name"
                    errorMessage={errors.name?.message}
                    register={register('name')}
                />
                <div css={styles.form.button}>
                    <Button type="submit" size="lg">
                        変更する
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
