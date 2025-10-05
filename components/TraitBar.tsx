type Props = {
  label: string
  value: number // 0-100
}
export default function TraitBar({ label, value }: Props) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-800">{label}</span>
        <span className="text-xs text-slate-600" aria-live="polite">{Math.round(value)}%</span>
      </div>
      <div className="mt-1 h-3 rounded-full bg-slate-200 overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(value)}>
        <div className="h-full bg-brand-600" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}
