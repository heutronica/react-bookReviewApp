import { DEFAULT_COLORS } from './default_colors'

export const theme: defaultTheme = {
    defaultColors: DEFAULT_COLORS,
    colors: {
        primary: '#12A3AC',
        primaryContrast: '#ffffff',
        primaryShade: '#108f97',
        primaryTint: '#2aacb4',

        secondary: '#1F4161',
        secondaryContrast: '#ffffff',
        secondaryShade: '#1b3955',
        secondaryTint: '#355471',

        tertiary: '#F29138',
        tertiaryContrast: '#000000',
        tertiaryShade: '#d58031',
        tertiaryTint: '#f39c4c',

        success: '#3e6fee',
        successContrast: '#ffffff',
        successShade: '#3762d1',
        successTint: '#517df0',
        successLight: '#e0e8fd',

        warning: '#ffc409',
        warningContrast: '#000000',
        warningShade: '#e0ac08',
        warningTint: '#ffca22',

        danger: '#eb445a',
        dangerContrast: '#ffffff',
        dangerShade: '#cf3c4f',
        dangerTint: '#ed576b',
        dangerLight: '#ffedef',

        medium: '#92949c',
        mediumContrast: '#000000',
        mediumShade: '#808289',
        mediumTint: '#9d9fa6',

        light: '#f4f5f8',
        lightContrast: '#000000',
        lightShade: '#d7d8da',
        lightTint: '#f5f6f9',
    },
    black: '#393533',
    white: '#ffffff',
    breakpoints: {
        sm: '380px',
        md: '780px',
        lg: '1120px',
    },
    radius: {
        sm: '2px',
        md: '5px',
        lg: '10px',
    },
    shadow: {
        sm: '1px 1px 0 0px #393533',
        md: '3px 3px 0 2px #393533',
        //sm: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
        //md: '0px 0px 10px 0px rgba(0, 0, 0, 0.3)',
        //md: '0px 4px rgba(0, 0, 0, 0.9)',
    },
    fontSizes: {
        //https://min-max-calculator.9elements.com/
        sm: 'clamp(0.688rem, 0.637rem + 0.25vw, 0.813rem)',
        md: 'clamp(0.875rem, 0.825rem + 0.25vw, 1rem)',
        lg: 'clamp(1rem, 0.92rem + 0.4vw, 1.2rem)',
    },
}

const breakpoints = Object.values(theme.breakpoints)
export const mq = breakpoints.map((bp) => `@media (max-width: ${bp})`)
