"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { motion } from "framer-motion"

const data = [
  { day: "Mon", complete: 1500, pending: 1200 },
  { day: "Tue", complete: 4200, pending: 3000 },
  { day: "Wed", complete: 2800, pending: 1500 },
  { day: "Thu", complete: 3800, pending: 3400 },
  { day: "Fri", complete: 2600, pending: 2200 },
  { day: "Sat", complete: 3100, pending: 2600 },
]

export default function SalesChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="h-65"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="day" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="complete"
            stroke="#38bdf8"
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="pending"
            stroke="#facc15"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
