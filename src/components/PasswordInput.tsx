import { css } from '@emotion/react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { theme } from '../style/theme'

type Props = {
    label?: string
    errorMessage: string | undefined
    register: UseFormRegisterReturn
    placeholder?: string
}

export const PasswordInput: React.FC<Props> = ({
    label,
    errorMessage,
    register,
    placeholder,
}) => {
    return (
        <div>
            {label && (
                <label css={[styles.label, errorMessage && styles.labelError]}>
                    {label}
                </label>
            )}
            <div>
                {label ? (
                    <input
                        type="password"
                        css={[styles.input, errorMessage && styles.inputError]}
                        placeholder={placeholder}
                        {...register}
                    />
                ) : (
                    <input
                        type="password"
                        css={[
                            styles.input,
                            styles.nolabel,
                            errorMessage && styles.inputError,
                        ]}
                        placeholder={placeholder}
                        {...register}
                    />
                )}
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
