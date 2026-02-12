import { Badge } from "@/components/ui/badge"

export default function CustomerStatus({ status }) {
  const styles = {
    Active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    Inactive: "bg-slate-500/15 text-slate-400 border-slate-500/20",
  }

  return (
    <Badge className={`border ${styles[status]}`}>
      {status}
    </Badge>
  )
}
