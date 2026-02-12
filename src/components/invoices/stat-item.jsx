export default function StatItem({ label, value, sub, suffix }) {
  return (
    <div className="text-center space-y-1">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="text-xl font-semibold text-white">
        {value}
        {sub && (
          <span className="text-sm text-slate-400">
            {sub}
          </span>
        )}
        {suffix && (
          <span className="ml-1 text-sm text-slate-400">
            {suffix}
          </span>
        )}
      </p>
    </div>
  )
}
