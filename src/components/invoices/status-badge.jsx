import { Badge } from "@/components/ui/badge"

export default function StatusBadge({ status }) {
  const styles = {
    Paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    Pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
    Overdue: "bg-red-500/15 text-red-400 border-red-500/20",
  }

  return (
    <Badge className={`border ${styles[status]}`}>
      {status}
    </Badge>
  )
}
