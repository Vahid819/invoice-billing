"use client"

import { Pie, PieChart } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const data = [
  { status: "Paid", value: 240, fill: "hsl(var(--chart-1))" },
  { status: "Pending", value: 70, fill: "hsl(var(--chart-2))" },
  { status: "Overdue", value: 32, fill: "hsl(var(--chart-3))" },
]

export default function InvoiceStatusChart() {
  return (
    <ChartContainer
      config={{
        Paid: { label: "Paid", color: "hsl(var(--chart-1))" },
        Pending: { label: "Pending", color: "hsl(var(--chart-2))" },
        Overdue: { label: "Overdue", color: "hsl(var(--chart-3))" },
      }}
      className="h-60"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="status"
          innerRadius={60}
          strokeWidth={5}
        />
      </PieChart>
    </ChartContainer>
  )
}
