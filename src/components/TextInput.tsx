import { css } from '@emotion/react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { theme } from '../style/theme'

type Props = {
    label?: string
    name: string
    errorMessage: string | undefined
    register: UseFormRegisterReturn
    defaultValue?: string
    placeholder?: string
}

export const TextInput: React.FC<Props> = ({
    label,
    name,
    errorMessage,
    register,
    defaultValue,
    placeholder,
}) => {
    return (
        <div>
            <label css={styles.label}>{label}</label>
            <div>
                <input
                    type="text"
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
        display: 'block',
        margin: '5px 0',
        textAlign: 'left',
        fontSize: theme.fontSizes.md,
        //fontWeight: '600',
        color: theme.colors.mediumShade,
    }),
    input: css({
        width: '100%',
        borderRadius: theme.radius.md,
        padding: '0.4rem 0.7rem',
        borderColor: theme.colors.lightShade,
        backgroundColor: theme.colors.light,
    }),
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
