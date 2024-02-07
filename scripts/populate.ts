import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const main = async () => {
    // create data for the database, { date: Date, value: float }. 100 Records from todat till 100 days ago

    const data = Array.from({ length: 100 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return {
            date,
            value: Math.random() * 100,
        };
    });

    await db.data.createMany({
        data,
    });

    const allData = await db.data.findMany();
    console.table({
        length: allData.length,
        first: allData[0],
        last: allData[allData.length - 1],
    });
}

main()
    .catch(e => {
        throw e;
    })
    .finally(async () => {
        await db.$disconnect();
    });


