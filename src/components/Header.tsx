import { Link, useNavigate } from 'react-router-dom'

import { Button, Container, Grid, Group, Title, Anchor } from '@mantine/core'
import { useAuth } from '../lib/AuthContextProvider'

export const Header = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const logout = () => {
        auth.signOut(() => {
            navigate('/login', { replace: true })
        })
    }
    return (
        <Container
            py={30}
            mb={50}
            size="100"
            sx={(theme) => ({
                backgroundColor: theme.colors.gray[1],
            })}
        >
            <Container size="xl">
                <Grid justify="space-between">
                    <Grid.Col span={2}>
                        <Anchor component={Link} to="/">
                            <Title order={2}>Favbook</Title>
                        </Anchor>
                    </Grid.Col>
                    {auth.isAuth ? (
                        <Grid.Col span={10}>
                            <Group position="right">
                                <div>
                                    こんにちは、
                                    <Link to="/profile">{auth.name}さん</Link>
                                </div>
                                <Button onClick={logout}>ログアウト</Button>
                            </Group>
                        </Grid.Col>
                    ) : (
                        <Grid.Col span={10}>
                            <Group position="right">
                                <Button<typeof Link>
                                    component={Link}
                                    to="/signup"
                                >
                                    ユーザー登録
                                </Button>
                                <Button<typeof Link>
                                    component={Link}
                                    to="/login"
                                    variant="outline"
                                >
                                    ログイン
                                </Button>
                            </Group>
                        </Grid.Col>
                    )}
                </Grid>
            </Container>
        </Container>
    )
}
