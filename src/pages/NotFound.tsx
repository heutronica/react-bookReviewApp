import { Link } from 'react-router-dom'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import { css } from '@emotion/react'
import { theme } from '../style/theme'

export const NotFound = () => {
    return (
        <>
            <Header />
            <main css={styles.main}>
                <div css={styles.wrapper}>
                    <h1 css={styles.title}>
                        おや！ページが見当たらないようです😢
                    </h1>
                    <Link to="">ホーム画面に戻る</Link>
                </div>
            </main>
            <Footer />
        </>
    )
}

const styles = {
    main: css({ padding: '0 1.2rem' }),
    wrapper: css({
        margin: '0 auto',
        padding: '20vh 0',
        maxWidth: theme.breakpoints.lg,
        textAlign: 'center',
    }),
    title: css({
        fontSize: 'clamp(2rem, 1.8rem + 1vw, 2.5rem)',
        lineHeight: '0.9',
        marginBottom: '2rem',
    }),
}
