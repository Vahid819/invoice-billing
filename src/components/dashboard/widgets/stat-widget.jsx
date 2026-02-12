import GlassCard from "@/components/ui/glass-card"

export default function StatWidget({ icon, label, value, children }) {
  return (
    <GlassCard className="p-4 flex items-center gap-4">
      <div className="text-cyan-400">{icon}</div>

      <div className="flex-1">
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-xl font-semibold text-white">{value}</p>
        {children}
      </div>
    </GlassCard>
  )
}
