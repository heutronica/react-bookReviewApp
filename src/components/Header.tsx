import { Link, useNavigate } from 'react-router-dom'

import { Button, Container } from '@mantine/core'
import { useAuth } from '../lib/AuthContextProvider'

export const Header = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const userName = auth.user
    const logout = () => {
        auth.signOut(() => {
            navigate('/', { replace: true })
        })
    }

    return (
        <Container>
            <h1>Favbook</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/SignUp">SignUp</Link>
                </li>
                <li>
                    <Link to="/protected">RequireBook</Link>
                </li>
                <Button onClick={logout}>ログアウト</Button>
            </ul>
            <div>こんにちは、{userName}さん</div>
        </Container>
    )
}
