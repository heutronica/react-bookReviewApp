import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { ThemeProvider, Global } from '@emotion/react'
import { theme } from './style/theme'
import { globalStyle } from './style/global'
import sanitize from 'sanitize.css'
import typography from 'sanitize.css/typography.css'
import forms from 'sanitize.css/forms.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Global styles={[globalStyle, sanitize, typography, forms]} />
            <App />
        </ThemeProvider>
    </React.StrictMode>
)
