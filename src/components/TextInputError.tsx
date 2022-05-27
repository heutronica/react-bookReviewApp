import React from 'react'
import { Alert } from '@mantine/core'

export const TextInputError = (props) => {
    return <Alert title="Error">{props.children}</Alert>
}
