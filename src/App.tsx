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
import { Profile } from './pages/Profile'
import { New } from './pages/New'
import { Edit } from './pages/Edit'
import { Detail } from './pages/{id}'
import { NotFound } from './pages/NotFound'

import { AuthProvider, useAuth } from './lib/AuthContextProvider'

function App() {
    return (
        <AuthProvider>
            <Router>
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
                    <Route
                        path="/detail/:booksId"
                        element={
                            <RequireAuth>
                                <Detail />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/edit/:booksId"
                        element={
                            <RequireAuth>
                                <Edit />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <RequireAuth>
                                <Profile />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/new"
                        element={
                            <RequireAuth>
                                <New />
                            </RequireAuth>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </AuthProvider>
    )
}

// ????????????????????????????????????????????????

function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth()
    let location = useLocation()

    if (!auth.isLoading) {
        if (!auth.isAuth) {
            return <Navigate to="/login" state={{ from: location }} replace />
        }
        return children
    }
    return <>????????????</>
}

function RequireNoAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth()
    if (!auth.isLoading) {
        if (!auth.isAuth) {
            return children
        }
        return <Navigate to="/protected" replace />
    }
    return <>????????????</>
}

export default App
