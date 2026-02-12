import StatWidget from "./stat-widget"
import { Users } from "lucide-react"

export default function VisitorWidget() {
  return (
    <StatWidget
      icon={<Users />}
      label="Visitors"
      value="6,354"
    >
      <p className="text-xs text-emerald-400 mt-1">
        +12% from last week
      </p>
    </StatWidget>
  )
}
