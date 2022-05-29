import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
    useLocation,
} from 'react-router-dom'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { Books } from './pages/Books'
import { Home } from './pages/Home'
import { Header } from './components/Header'

import { AuthProvider, useAuth } from './lib/AuthContextProvider'

function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <RequireNoAuth>
                                <Books />
                            </RequireNoAuth>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <RequireNoAuth>
                                <Login />
                            </RequireNoAuth>
                        }
                    />
                    <Route
                        path="/signUp"
                        element={
                            <RequireNoAuth>
                                <SignUp />
                            </RequireNoAuth>
                        }
                    />
                    <Route
                        path="/protected"
                        element={
                            <RequireAuth>
                                <Home />
                            </RequireAuth>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    )
}

// 認証状態に応じたリダイレクト処理

function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth()
    let location = useLocation()

    if (!auth.isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children
}

function RequireNoAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth()

    if (!auth.isAuth) {
        return children
    }
    return <Navigate to="/protected" replace />
}

export default App
