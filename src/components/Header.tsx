import { Link } from 'react-router-dom'

import { Container } from '@mantine/core'
import React from 'react'

export const Header = () => {
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
                    <Link to="/books">books</Link>
                </li>
            </ul>
        </Container>
    )
}
