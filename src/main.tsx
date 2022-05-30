import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { MantineProvider, MantineThemeOverride } from '@mantine/core'

const myTheme: MantineThemeOverride = {
    colorScheme: 'light',
    primaryColor: 'cyan',
    black: '#212529',
    fontFamily: 'Open Sans',
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider theme={myTheme} withGlobalStyles withNormalizeCSS>
            <App />
        </MantineProvider>
    </React.StrictMode>
)
