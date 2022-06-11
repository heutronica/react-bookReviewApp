import { useState } from 'react'
import { useAuth } from '../lib/AuthContextProvider'
import { Button } from '../components/Button'
import { TextInput } from '../components/TextInput'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import { css } from '@emotion/react'
import { theme, mq } from '../style/theme'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { nameSchema } from '../lib/formSchema/nameSchema'

export const Profile = () => {
    const [statusMessage, setStatusMessage] = useState<APIStatus>({
        status: 'default',
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
        <>
            <Header />
            <main css={styles.main}>
                <div css={styles.wrapper}>
                    <div css={styles.side.container}>
                        <div css={styles.side.title}>
                            <h2>ユーザーネーム変更</h2>
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
                        <form onSubmit={onSubmit} css={styles.form.wrapper}>
                            <TextInput
                                label="ユーザーネーム"
                                type="text"
                                errorMessage={errors.name?.message}
                                register={register('name')}
                            />
                            <div>
                                <Button type="submit" size="lg">
                                    変更する
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
        border: 'solid 2px',
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
        success: css({
            display: 'flex',
            alignItems: 'center',
            borderTop: 'solid 1px',
            borderColor: theme.black,
            backgroundColor: theme.colors.successShade,
            color: theme.colors.successLight,
        }),
    },
}
