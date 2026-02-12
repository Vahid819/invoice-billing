import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import RevenueChart from "@/components/dashboard/revenue-chart"
import InvoiceStatusChart from "@/components/dashboard/invoice-status-chart"

export default function page() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2 glass">
        <CardHeader>
          <CardTitle className="text-sm text-slate-300">
            Revenue Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RevenueChart />
        </CardContent>
      </Card>

      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-sm text-slate-300">
            Invoice Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <InvoiceStatusChart />
        </CardContent>
      </Card>
    </div>
  )
}
