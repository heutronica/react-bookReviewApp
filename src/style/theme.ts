import { Tuple } from '@mantine/core'
import { DEFAULT_COLORS } from './default_colors'

export const theme: defaultTheme = {
    defaultColors: DEFAULT_COLORS,
    colors: {
        primary: ['#5dd5de', '#12A3AC', '#00747d'],
        secondary: ['#4e6c8f', '#1f4161', '#001b37'],
    },
    black: '#393533',
    white: '#ffffff',
    breakpoints: {
        sm: '380px',
        md: '780px',
        lg: '1200px',
    },
    radius: {
        sm: '2px',
        md: '5px',
        lg: '10px',
    },
    shadow: {
        sm: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
        md: '0px 0px 10px 0px rgba(0, 0, 0, 0.3)',
    },
    fontSizes: {
        sm: '0.8rem',
        md: '1rem',
        lg: '1.2rem',
    },
}

export interface defaultTheme {
    defaultColors: { [K in string]: Array<string> }
    colors: Record<string, Tuple<string, 3>>
    black: string
    white: string
    breakpoints: Record<'sm' | 'md' | 'lg', string>
    radius: Record<'sm' | 'md' | 'lg', string>
    shadow: Record<'sm' | 'md', string>
    fontSizes: Record<'sm' | 'md' | 'lg', string>
}
