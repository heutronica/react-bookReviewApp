type colorSchema =
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'medium'
    | 'light'

declare interface defaultTheme {
    defaultColors: { [K in string]: Array<string> }
    colors: {
        [K in colorSchema]: {
            default: string
            contrast: string
            shade: string
            tint: string
            light?: string
        }
    }
    black: string
    white: string
    breakpoints: Record<'sm' | 'md' | 'lg', string>
    radius: Record<'sm' | 'md' | 'lg', string>
    shadow: Record<'sm' | 'md', string>
    fontSizes: Record<'sm' | 'md' | 'lg', string>
}
