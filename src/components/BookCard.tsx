import React from 'react'
import { Box, MantineThemeColors, useMantineTheme, Text } from '@mantine/core'

export const BookCard = ({
    children,
    id,
}: {
    children: React.ReactNode
    id: string
}) => {
    const theme = useMantineTheme()

    let randomProperty = (obj: MantineThemeColors, place: string) => {
        let keys = Object.keys(obj)

        let convertDecimal = (num: string) => {
            if (place === 'front') {
                return num.slice(0, 1)
            } else {
                return num.slice(-1)
            }
        }

        const parseNum = parseInt(convertDecimal(id), 16)
        let convertNum = Math.floor((parseNum / 16) * 10)

        return obj[keys[convertNum]]
    }
    let colorPick1 = randomProperty(theme.colors, 'front')
    let colorPick2 = randomProperty(theme.colors, 'end')

    return (
        <Box
            sx={(theme) => ({
                backgroundColor: colorPick2[7],
                textAlign: 'center',
                padding: theme.spacing.xl,
                borderRadius: theme.radius.sm,
                boxShadow: theme.shadows.md,
                width: '160px',
                height: '200px',
                cursor: 'pointer',
            })}
        >
            <Text color="white" weight="bold">
                {children}
            </Text>
        </Box>
    )
}
