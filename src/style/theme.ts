import { DEFAULT_COLORS } from './default_colors'

export const theme: defaultTheme = {
    defaultColors: DEFAULT_COLORS,
    colors: {
        primary: {
            default: '#12A3AC',
            contrast: '#ffffff',
            shade: '#108f97',
            tint: '#2aacb4',
        },
        secondary: {
            default: '#1F4161',
            contrast: '#ffffff',
            shade: '#1b3955',
            tint: '#355471',
        },
        tertiary: {
            default: '#F29138',
            contrast: '#000000',
            shade: '#d58031',
            tint: '#f39c4c',
        },
        success: {
            default: '#3e6fee',
            contrast: '#ffffff',
            shade: '#3762d1',
            tint: '#517df0',
            light: '#e0e8fd',
        },
        warning: {
            default: '#ffc409',
            contrast: '#000000',
            shade: '#e0ac08',
            tint: '#ffca22',
        },
        danger: {
            default: '#eb445a',
            contrast: '#ffffff',
            shade: '#cf3c4f',
            tint: '#ed576b',
            light: '#ffedef',
        },
        medium: {
            default: '#92949c',
            contrast: '#000000',
            shade: '#808289',
            tint: '#9d9fa6',
        },
        light: {
            default: '#f4f5f8',
            contrast: '#000000',
            shade: '#d7d8da',
            tint: '#f5f6f9',
        },
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
    },
    fontSizes: {
        //https://min-max-calculator.9elements.com/
        sm: 'clamp(0.688rem, 0.637rem + 0.25vw, 0.813rem)',
        md: 'clamp(0.875rem, 0.825rem + 0.25vw, 1rem)',
        lg: 'clamp(1rem, 0.92rem + 0.4vw, 1.2rem)',
    },
}

// Media Queryの設定
// TODO: 不親切設計なので、リファクタしたい
const breakpoints = Object.values(theme.breakpoints)
export const mq = breakpoints.map((bp) => `@media (max-width: ${bp})`)
