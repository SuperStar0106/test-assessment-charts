import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const main = async () => {
   // change the order, so the latest data is last
    const allData = await db.data.findMany({
         orderBy: {
            date: "asc"
         }
    });

    await db.data.deleteMany({});

    const data = allData.map((d) => {
        return {
            date: d.date,
            value: d.value
        }
    });

    await db.data.createMany({
        data,
    });

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
