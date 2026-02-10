import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"

export default function PaymentsTable() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900">
      {/* Table Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
        <h2 className="text-sm font-medium text-slate-200">
          Recent Payments
        </h2>
        <button className="text-sm text-slate-400 hover:text-slate-200">
          Export
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="px-4 py-3 text-left font-medium">Amount</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Customer</th>
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-right font-medium"></th>
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 12 }).map((_, i) => (
              <tr
                key={i}
                className="border-b border-slate-800 last:border-none hover:bg-slate-800/40 transition"
              >
                {/* Amount */}
                <td className="px-4 py-3 text-slate-100">
                  $9.00 <span className="text-slate-400">USD</span>
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <Badge className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                    Succeeded
                  </Badge>
                </td>

                {/* Customer */}
                <td className="px-4 py-3 text-slate-300">
                  customer@email.com
                </td>

                {/* Date */}
                <td className="px-4 py-3 text-slate-400">
                  Feb 24, 2024 · 10:44 AM
                </td>

                {/* Actions */}
                <td className="px-4 py-3 text-right">
                  <button className="p-1 rounded-md hover:bg-slate-700 text-slate-400 hover:text-slate-200">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800 text-sm text-slate-400">
        <span>Viewing 1–12 of 844 results</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-md border border-slate-700 hover:bg-slate-800">
            Previous
          </button>
          <button className="px-3 py-1 rounded-md border border-slate-700 hover:bg-slate-800">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
