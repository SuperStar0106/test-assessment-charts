import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const main = async () => {
    const length = await db.data.count()

    if (length === 0) {
        console.log('Populating data...')

        const data = Array.from({ length: 100 }, (_, i) => {
            const date = new Date()
            date.setDate(date.getDate() - i)
            return {
                date,
                value: Math.random() * 100,
            }
        }).sort((a, b) => a.date.getTime() - b.date.getTime())

        await db.data.createMany({
            data,
        })

        const allData = await db.data.findMany()
        console.table({
            length: allData.length,
            first: allData[0],
            last: allData[allData.length - 1],
        })
    } else {
        console.log('Data already exists. Adding new data...')
        const lastDate = (await db.data.findFirst({
            orderBy: {
                date: 'desc',
            },
        })) ?? { date: new Date() }
        console.log('Last date:', lastDate.date.toISOString())
        const today = new Date()

        const data = Array.from(
            { length: (today.getTime() - lastDate.date.getTime()) / 86400000 },
            (_, i) => {
                const date = new Date(lastDate.date)
                date.setDate(date.getDate() + (i + 1))
                return {
                    date,
                    value: Math.random() * 100,
                }
            },
        )

        if (data.length === 0) {
            console.log('No new data to add')
            return
        }
        console.log('Adding', data.length, 'new data points')

        await db.data.createMany({
            data,
        })

        const allData = await db.data.findMany()
        console.table({
            length: allData.length,
            first: allData[0],
            last: allData[allData.length - 1],
        })
    }
}

main()
    .catch((e) => {
        throw e
    })
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    .finally(async () => {
        await db.$disconnect()
    })
