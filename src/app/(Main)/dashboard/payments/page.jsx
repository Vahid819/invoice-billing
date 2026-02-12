import PaymentsTable from "@/components/payments-table"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Payments</h1>
        <button className="px-4 py-2 bg-primary text-white rounded-md">
          + Create payment
        </button>
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
