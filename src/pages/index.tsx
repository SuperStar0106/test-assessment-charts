import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Button, DateRange } from "react-day-picker";
import Chart from "~/components/Chart";
import { DatePickerWithRange } from "~/components/Daterange";
import { api } from "~/utils/api";

export default function Home() {

  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(2024, 0, 27),
    to: new Date(2024, 1, 2),
  });

  const { data, isLoading } = api.data.daterange.useQuery({
    startDate: dateRange.from?.toString(),
    endDate: dateRange.to?.toString(),
  });

  return (
    <>
      <Head>
        <title>Test - Charts</title>
        <meta name="description" content="Charts" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center space-y-2">
      <div className="flex flex-row space-x-2">
      <DatePickerWithRange setRange={setDateRange} />
      </div>
          {
            isLoading ? (
              <div>Loading...</div>
            ) : data ? (
              <div className="flex flex-col items-center justify-center">
                <Chart data={data.sort(
                  (a, b) => b.date.getTime() - a.date.getTime()
                ).map((d) => ({ date: `${d.date.getDate()} ${d.date.toLocaleString("default", { month: "short" })}`, value: d.value }))} />
              </div>
            ) : (
              <div>There was an error</div>
            )
          }
      </main>
    </>
  );
}
