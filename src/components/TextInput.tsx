import { css } from '@emotion/react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { theme } from '../style/theme'

type Props = {
    label: string
    type: string
    errorMessage: string | undefined
    register: UseFormRegisterReturn
    defaultValue?: string
    placeholder?: string
}

export const TextInput: React.FC<Props> = ({
    label,
    type,
    errorMessage,
    register,
    defaultValue,
    placeholder,
}) => {
    return (
        <div>
            <label css={[styles.label, errorMessage && styles.labelError]}>
                {label}
            </label>
            <div>
                <input
                    type={type}
                    css={[styles.input, errorMessage && styles.inputError]}
                    placeholder={placeholder}
                    {...register}
                />

                {errorMessage && (
                    <span css={styles.errorMessage}>{errorMessage}</span>
                )}
            </div>
        </div>
    )
}

const styles = {
    label: css({
        display: 'inline-block',
        textAlign: 'left',
        fontSize: theme.fontSizes.sm,
        fontWeight: '700',
        color: theme.white,
        backgroundColor: theme.black,
        borderRadius: '5px 5px 0 0',
        padding: '0.4rem 1rem',
    }),
    input: css({
        width: '100%',
        borderRadius: '0 5px 5px 5px',
        padding: '0.4rem 0.7rem',
        borderColor: theme.black,
        backgroundColor: theme.colors.light,
    }),
    nolabel: {
        borderRadius: '5px',
    },
    labelError: {
        backgroundColor: theme.colors.danger,
    },
    inputError: css({
        borderColor: theme.colors.danger,
        backgroundColor: theme.colors.dangerLight,
    }),
    errorMessage: css({
        color: theme.colors.danger,
        fontSize: theme.fontSizes.sm,
        marginTop: '5px',
    }),
}
