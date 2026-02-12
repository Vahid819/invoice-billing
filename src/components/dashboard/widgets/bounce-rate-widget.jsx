import StatWidget from "./stat-widget"
import { TrendingDown } from "lucide-react"

export default function BounceRateWidget() {
  return (
    <StatWidget
      icon={<TrendingDown />}
      label="Bounce Rate"
      value="20%"
    >
      <p className="text-xs text-red-400 mt-1">
        Needs attention
      </p>
    </StatWidget>
  )
}
