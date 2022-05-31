import React, { useEffect, useState } from 'react'

interface AuthContextType {
    name: string
    updateName: (name: string) => void
    getName: (callback: VoidFunction) => string
    isLoading: boolean
    isAuth: boolean
    signIn: (callback: VoidFunction) => void
    signOut: (callback: VoidFunction) => void
}

type SignInResponse = {
    Success: {
        name: string
    }
    Error: {
        ErrorCode: number
        ErrorMessageJP: string
        ErrorMessageEN: string
    }
}

const AuthContext = React.createContext<AuthContextType>(null!)

export function useAuth() {
    return React.useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [name, setName] = useState<string | undefined>()
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (sessionStorage.getItem('auth.token') !== null) {
            signIn(() => {})
        }
        setIsLoading(false)
    }, [''])

    const getName = () => {
        if (name) return name

        const token = sessionStorage.getItem('auth.token')
        const promise = fetch(
            'https://api-for-missions-and-railways.herokuapp.com/users',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            }
        )
            .then((response) => response.json())
            .then((data: SignInResponse['Success']) => setName(data.name))
        throw promise
    }

    const updateName = (name: string) => {
        setName(name)
    }

    const signIn = (callback: VoidFunction) => {
        setIsAuth(true)
        callback()
    }

    const signOut = (callback: VoidFunction) => {
        sessionStorage.removeItem('auth.token')
        setIsAuth(false)
        setName('')

        callback()
    }

    let value = {
        name,
        updateName,
        getName,
        isLoading,
        isAuth,
        signIn,
        signOut,
    }
    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}
