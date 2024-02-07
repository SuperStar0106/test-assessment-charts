import { dataRouter } from '~/server/api/routers/data'
import { createTRPCRouter } from '~/server/api/trpc'

export const appRouter = createTRPCRouter({
    data: dataRouter,
})

export type AppRouter = typeof appRouter
