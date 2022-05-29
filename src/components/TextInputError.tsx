import React from 'react'
import { Alert } from '@mantine/core'

export const TextInputError = ({ children }: { children: React.ReactNode }) => {
    return <Alert title="Error">{children}</Alert>
}
