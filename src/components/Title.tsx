import React, { ReactNode } from 'react'
import { css } from '@emotion/react'
import { theme } from '../style/theme'

type Props = {
    children: ReactNode
    size: '1' | '2' | '3'
}

export const Title: React.FC<Props> = ({ children, size }) => {
    switch (size) {
        case '1':
            return <h1 css={styles.h1}>{children}</h1>

        case '2':
            return <h2 css={styles.h2}>{children}</h2>

        case '3':
            return <h3 css={styles.h3}>{children}</h3>
        //case '4':
        //    return <h4>{children}</h4>
        default:
            return <p>{children}</p>
    }
}

const styles = {
    h1: css({
        marginTop: '0',
        fontSize: '3rem',
        fontWeight: '700',
    }),
    h2: css({
        marginTop: '0',
        fontSize: '1.5rem',
        fontWeight: '500',
    }),
    h3: css({
        marginTop: '0',
        fontSize: '1.2rem',
        fontWeight: '700',
    }),
    //h4:css({
    //    fontSize:'3rem',
    //    fontWeight:'700'
    //}),
}
