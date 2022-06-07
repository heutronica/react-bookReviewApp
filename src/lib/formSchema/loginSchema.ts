import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email({ message: '無効なメールアドレスです' }),
    password: z.string().min(1, { message: 'パスワードを入力してください' }),
})

export type loginSchema = z.infer<typeof loginSchema>
