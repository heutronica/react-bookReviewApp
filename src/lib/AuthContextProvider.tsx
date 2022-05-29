import React from 'react'

interface AuthContextType {
    name: string
    //setUserName: (name: string) => void
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
    let [name, setName] = React.useState<string>('')
    let [isAuth, setIsAuth] = React.useState<boolean>(false)

    const getName = () => {
        const token = sessionStorage.getItem('auth.token')
        fetch('https://api-for-missions-and-railways.herokuapp.com/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then((response) => response.json())
            .then((data: SignInResponse['Success']) => setName(data.name))
    }

    const signIn = (callback: VoidFunction) => {
        setIsAuth(true)
        getName()
        callback()
    }

    const signOut = (callback: VoidFunction) => {
        sessionStorage.removeItem('auth.token')
        setIsAuth(false)
        setName('')

        callback()
    }
    let value = { name, isAuth, signIn, signOut }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
