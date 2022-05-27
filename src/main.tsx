import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { MantineProvider, MantineThemeOverride } from '@mantine/core'

const myTheme: MantineThemeOverride = {
    colorScheme: 'light',
    primaryColor: 'orange',
    defaultRadius: 0,
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider theme={myTheme} withGlobalStyles withNormalizeCSS>
            <App />
        </MantineProvider>
    </React.StrictMode>
)
