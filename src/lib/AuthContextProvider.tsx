import React from 'react'

interface AuthContextType {
    user: string | null
    isAuth: boolean
    signIn: (callback: VoidFunction) => void
    signOut: (callback: VoidFunction) => void
}

export const AuthContext = React.createContext<AuthContextType>(null!)

export function useAuth() {
    return React.useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    let [user, setUser] = React.useState<string | null>(null)
    let [isAuth, setIsAuth] = React.useState<boolean>(false)

    const signIn = (callback: VoidFunction) => {
        setIsAuth(true)
        callback()
    }

    const signOut = (callback: VoidFunction) => {
        setIsAuth(false)
        callback()
    }
    let value = { user, isAuth, signIn, signOut }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
