import StatWidget from "./stat-widget"
import { Package } from "lucide-react"

export default function ProductSalesWidget() {
  return (
    <StatWidget
      icon={<Package />}
      label="Product Sales"
      value="$5,363"
    >
      <p className="text-xs text-cyan-400 mt-1">
        Trending upward
      </p>
    </StatWidget>
  )
}
