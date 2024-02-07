import type { inferProcedureInput } from '@trpc/server'
import type { AppRouter } from '../root'
import { createCaller } from '../root'
import { createInnerTRPCContext } from '../trpc'

import { expect, suite, test } from 'vitest'

process.env.TZ = 'UTC'
suite('data router', async () => {
    const ctx = createInnerTRPCContext({})
    const caller = createCaller(ctx)

    test('fetch data with date range', async () => {
        type Input = inferProcedureInput<AppRouter['data']['daterange']>

        const today = new Date()
        const tomorrow = new Date(today)
        console.log('today', today)
        tomorrow.setDate(today.getDate() + 1)
        console.log('tomorrow', tomorrow)
        const sevenDaysAgo = new Date(today)
        sevenDaysAgo.setDate(today.getDate() - 7)

        const input: Input = {
            startDate: sevenDaysAgo.toISOString().split('T')[0],
            endDate: tomorrow.toISOString().split('T')[0],
        }
        const result = await caller.data.daterange(input)

        expect(result).toBeTruthy()
        expect(result[0]?.date.toLocaleDateString()).toEqual(
            sevenDaysAgo.toLocaleDateString(),
        )
        expect(result[0]?.value).toBeTypeOf('number')
        expect(result[result.length - 1]?.date.toLocaleDateString()).toEqual(
            today.toLocaleDateString(),
        )
    })

    test('fetch random data', async () => {
        const result = await caller.data.randomdata()

        expect(result).toBeTruthy()
        expect(result[0]?.date).toBeInstanceOf(Date)
        expect(result[0]?.value).toBeTypeOf('number')
    })
})