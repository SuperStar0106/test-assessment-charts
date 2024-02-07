import { dataRouter } from './routers/data'
import { createCallerFactory, createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({
    data: dataRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
