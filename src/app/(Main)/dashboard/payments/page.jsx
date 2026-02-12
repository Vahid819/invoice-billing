import PaymentsTable from "@/components/payments-table"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Payments</h1>
        <Button className="bg-blue-600 hover:bg-blue-500">
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {["All", "Succeeded", "Refunded", "Failed"].map(tab => (
          <button
            key={tab}
            className="px-3 py-1.5 rounded-md border text-sm hover:bg-muted"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <PaymentsTable />
    </div>
  )
}
