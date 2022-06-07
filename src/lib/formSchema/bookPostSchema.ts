import { z } from 'zod'

export const bookPostSchema = z.object({
    title: z.string().min(1, { message: 'タイトルが入力されていません' }),
    url: z.string().regex(/^(https?|ftp)(:\/\/[\w\/:%#\$&\?\(\)~\.=\+\-]+)/, {
        message: 'URLではありません',
    }),
    detail: z.string().min(1, { message: '書籍概要が入力されていません' }),
    review: z.string().min(1, { message: 'レビューが入力されていません' }),
})

export type bookPostSchema = z.infer<typeof bookPostSchema>
