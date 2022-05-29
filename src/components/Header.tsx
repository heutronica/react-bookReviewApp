import { Link, useNavigate } from 'react-router-dom'

import { Button, Container } from '@mantine/core'
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
                {auth.isAuth && <Button onClick={logout}>ログアウト</Button>}
                {auth.isAuth && (
                    <div className="wao" key={auth.name}>
                        こんにちは、{auth.name}さん
                    </div>
                )}
            </ul>
        </Container>
    )
}
