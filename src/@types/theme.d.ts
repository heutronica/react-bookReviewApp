declare interface defaultTheme {
    defaultColors: { [K in string]: Array<string> }
    colors: { [K in string]: string }
    black: string
    white: string
    breakpoints: Record<'sm' | 'md' | 'lg', string>
    radius: Record<'sm' | 'md' | 'lg', string>
    shadow: Record<'sm' | 'md', string>
    fontSizes: Record<'sm' | 'md' | 'lg', string>
}
