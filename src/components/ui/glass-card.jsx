import { cn } from "@/lib/utils"

export default function GlassCard({ className, children }) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.35)]",
        className
      )}
    >
      {children}
    </div>
  )
}
