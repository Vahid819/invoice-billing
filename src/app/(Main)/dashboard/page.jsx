import GlassCard from "@/components/ui/glass-card"
import SalesChart from "@/components/charts/sales-chart"
import EarningsDonut from "@/components/charts/earnings-donut"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import VisitorWidget from "@/components/dashboard/widgets/visitor-widget"
import ProductSalesWidget from "@/components/dashboard/widgets/product-sales-widget"
import BounceRateWidget from "@/components/dashboard/widgets/bounce-rate-widget"
import CalendarUpdates from "@/components/dashboard/widgets/calendar-updates"

export default function DashboardPage() {
  return (
    <div
      className="
        columns-1
        md:columns-2
        xl:columns-3
        gap-6
      "
    >

      {/* SALES ANALYTICS */}
      <GlassCard className="mb-6 p-6 break-inside-avoid">
        <h2 className="text-white text-lg font-semibold mb-4">
          Sales Analytics
        </h2>
        <SalesChart />
      </GlassCard>

      {/* VISITOR */}
      <div className="mb-6 break-inside-avoid">
        <VisitorWidget />
      </div>

      {/* PRODUCT SALES */}
      <div className="mb-6 break-inside-avoid">
        <ProductSalesWidget />
      </div>

      {/* BOUNCE RATE */}
      <div className="mb-6 break-inside-avoid">
        <BounceRateWidget />
      </div>

      {/* EARNINGS */}
      <GlassCard className="mb-6 p-6 break-inside-avoid">
        <h2 className="text-white text-lg font-semibold mb-4">
          Earnings By Item
        </h2>
        <EarningsDonut />
      </GlassCard>

      {/* CALENDAR UPDATES */}
      <div className="mb-6 break-inside-avoid">
        <CalendarUpdates />
      </div>

      {/* LAST INVOICE */}
      <GlassCard className="mb-6 p-6 break-inside-avoid">
        <h3 className="text-white font-semibold mb-4">
          Last Invoice
        </h3>

        <div className="space-y-3 text-sm">
          <Row id="#42536" name="Home Chair" status="Paid" amount="$389.09" />
          <Row id="#4546" name="Circle Chair" status="Pending" amount="$124.43" />
          <Row id="#8746" name="Wooden Chair" status="Unpaid" amount="$544.53" />
        </div>
      </GlassCard>

      {/* REVIEW */}
      <GlassCard className="mb-6 p-6 text-center break-inside-avoid">
        <Avatar className="mx-auto mb-4">
          <AvatarFallback>JC</AvatarFallback>
        </Avatar>

        <p className="text-slate-300 italic">
          “Best product I’ve seen on market. Amazing quality!”
        </p>

        <p className="mt-3 text-yellow-400">⭐ 4.7</p>
        <p className="mt-1 text-white font-medium">
          John Connor
        </p>
      </GlassCard>

    </div>
  )
}

function Row({ id, name, status, amount }) {
  const color =
    status === "Paid"
      ? "text-green-400"
      : status === "Pending"
      ? "text-yellow-400"
      : "text-red-400"

  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-white">{id}</p>
        <p className="text-slate-400 text-xs">{name}</p>
      </div>
      <span className={color}>{status}</span>
      <span className="text-white">{amount}</span>
    </div>
  )
}
