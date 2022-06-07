import { z } from 'zod'

export const nameSchema = z.object({
    name: z
        .string()
        .min(1, { message: '名前が入力されていません' })
        .max(20, { message: '名前は20文字以下にしてください' }),
})

export type nameSchema = z.infer<typeof nameSchema>
