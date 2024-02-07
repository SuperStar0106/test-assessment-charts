import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { db } from '~/server/db'

export const dataRouter = createTRPCRouter({
    daterange: publicProcedure
        .input(
            z.object({
                startDate: z.string().default(''),
                endDate: z.string().default(''),
            }),
        )
        .query(async ({ input }) => {
            if (input.startDate === '' && input.endDate === '') {
                const data = db.data.findMany({
                    orderBy: {
                        date: 'desc',
                    },
                    take: 7,
                })
                return data
            }
            const data = db.data.findMany({
                where: {
                    date: {
                        gte: new Date(input.startDate),
                        lte: new Date(input.endDate),
                    },
                },
            })
            return data
        }),

    randomdata: publicProcedure.query(async () => {
        const data = new Array(7)
            .fill(0)
            .map((_, i) => {
                const date = new Date()
                date.setDate(date.getDate() - i)
                return {
                    date,
                    value: Math.random() * 100,
                }
            })
            .sort((a, b) => a.date.getTime() - b.date.getTime())

        return data
    }),
})
