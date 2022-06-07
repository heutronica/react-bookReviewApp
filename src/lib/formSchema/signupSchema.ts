import { z } from 'zod'

export const signupSchema = z
    .object({
        name: z
            .string()
            .min(1, { message: '名前が入力されていません' })
            .max(20, { message: '名前は20文字以下にしてください' }),
        email: z.string().email({ message: '無効なメールアドレスです' }),
        password: z
            .string()
            .min(8, { message: 'パスワードは最低でも8文字以上にしてください' })
            .regex(/[A-Za-z]+[0-9]/, {
                message:
                    '英字・数字それぞれ最低1文字ずつを含むものにしてください',
            }),
        passwordConfirm: z
            .string()
            .min(1, { message: '確認用パスワードを入力してください' }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: 'パスワードが一致しません',
        path: ['passwordConfirm'],
    })

export type signupSchema = z.infer<typeof signupSchema>
