import GlassCard from "@/components/ui/glass-card"

const updates = [
  { text: "Order 15 shipped", time: "5m" },
  { text: "Invoice 25365 paid", time: "10m" },
  { text: "Product commented", time: "15m" },
  { text: "Web service updated", time: "30m" },
]

export default function CalendarUpdates() {
  return (
    <GlassCard className="p-4">
      <h4 className="text-white font-semibold mb-3">
        Calendar Updates
      </h4>

      <div className="space-y-3 text-sm">
        {updates.map((item, i) => (
          <div key={i} className="flex justify-between text-slate-300">
            <span>{item.text}</span>
            <span className="text-xs text-slate-500">{item.time}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}
