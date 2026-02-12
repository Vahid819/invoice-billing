import {
  Card,
  CardContent,
} from "@/components/ui/card"

export default function SummaryCard({ title, value }) {
  return (
    <Card className="glass">
      <CardContent className="p-5">
        <p className="text-sm text-slate-400">{title}</p>
        <p className="mt-2 text-2xl font-semibold text-white">
          {value}
        </p>
      </CardContent>
    </Card>
  )
}
