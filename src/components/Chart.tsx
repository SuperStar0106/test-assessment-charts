import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    BarChart,
    Bar,
    Tooltip,
    type TooltipProps,
} from 'recharts'

import { type CSSProperties, type FC, useState } from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { DropdownMenuRadioGroup } from './ui/dropdown-menu'
import type { NameType } from 'recharts/types/component/DefaultTooltipContent'

type ChartProps = {
    data: { date: string; value: number }[]
}

const TooltipContent = <T extends (string | number)[], S extends NameType>({
    active,
    payload,
}: TooltipProps<T, S>) => {
    if (active && payload?.length) {
        return (
            <div className="rounded-lg border bg-background p-2 shadow-sm">
                <div className="flex flex-col">
                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Value
                    </span>
                    <span className="font-bold text-muted-foreground">
                        {payload[0]?.value}
                    </span>
                </div>
            </div>
        )
    }
}

const Chart: FC<ChartProps> = ({ data }) => {
    const [type, setType] = useState('line')

    const chart = () => {
        if (type === 'line') {
            return (
                <LineChart
                    margin={{
                        top: 5,
                        right: 10,
                        left: 10,
                        bottom: 0,
                    }}
                    data={data}
                    width={600}
                    height={300}
                >
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Line
                        type="monotone"
                        strokeWidth={2}
                        dataKey="value"
                        activeDot={{
                            r: 6,
                            style: {
                                fill: 'var(--theme-primary)',
                                opacity: 0.25,
                            },
                        }}
                        style={
                            {
                                stroke: 'var(--theme-primary)',
                                '--theme-primary': `hsl(20.5 90.2% 48.2%)`,
                            } as React.CSSProperties
                        }
                    />
                    <Tooltip content={TooltipContent} />
                </LineChart>
            )
        } else if (type === 'bar') {
            return (
                <BarChart width={600} height={300} data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                        cursor={{ fill: 'hsl(24 5.4% 63.9%)', opacity: 0.3 }}
                        content={TooltipContent}
                    />
                    <Bar
                        dataKey="value"
                        style={
                            {
                                fill: 'var(--theme-primary)',
                                opacity: 1,
                                '--theme-primary': `hsl(20.5 90.2% 48.2%)`,
                            } as CSSProperties
                        }
                    />
                </BarChart>
            )
        }
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Chart</h2>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Type</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuRadioGroup
                                    value={type}
                                    onValueChange={setType}
                                >
                                    <DropdownMenuRadioItem value="line">
                                        Line
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="bar">
                                        Bar
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardHeader>
            <CardContent>{chart()}</CardContent>
        </Card>
    )
}

export default Chart
