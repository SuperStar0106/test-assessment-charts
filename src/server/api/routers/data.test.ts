import type { inferProcedureInput } from '@trpc/server'
import type { AppRouter } from '../root'
import { createCaller } from '../root'
import { createInnerTRPCContext } from '../trpc'

import { expect, suite, test } from 'vitest'

suite('data router', async () => {
    const ctx = createInnerTRPCContext({})
    const caller = createCaller(ctx)

    test('fetch data with date range', async () => {
        type Input = inferProcedureInput<AppRouter['data']['daterange']>
        const input: Input = {
            startDate: '2023-10-26',
            endDate: '2023-11-23',
        }

        const result = await caller.data.daterange(input)

        expect(result).toBeTruthy()
        expect(result[0]?.date.toLocaleDateString()).toEqual(
            new Date('2023-10-26').toLocaleDateString(),
        )
        expect(result[0]?.value).toBeTypeOf('number')
        expect(result[result.length - 1]?.date.toLocaleDateString()).toEqual(
            new Date('2023-11-22').toLocaleDateString(),
        )
    })

    test('fetch random data', async () => {
        const result = await caller.data.randomdata()

        expect(result).toBeTruthy()
        expect(result[0]?.date).toBeInstanceOf(Date)
        expect(result[0]?.value).toBeTypeOf('number')
    })
})
