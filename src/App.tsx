import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { Books } from './pages/Books'
import { Header } from './components/Header'

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Books />} />
                <Route path="/login" element={<Login />} />
                <Route path="/SignUp" element={<SignUp />} />
            </Routes>
        </Router>
    )
}

function Home() {
    return (
        <>
            <h2>Home</h2>
        </>
    )
}

export default App
