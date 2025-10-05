import { ChangeEvent } from 'react'

type Props = {
  id: string
  label: string
  value?: number | null
  onChange: (v: number) => void
  min: number
  max: number
  name: string
}
export default function LikertRow({ id, label, value, onChange, min, max, name }: Props) {
  const scale = Array.from({ length: max - min + 1 }, (_, i) => i + min)
  const handle = (e: ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value))
  return (
    <fieldset className="card p-4">
      <legend className="font-medium text-slate-900">{label}</legend>
      <div className="mt-3 flex items-center gap-2 overflow-x-auto" role="radiogroup" aria-labelledby={id}>
        {scale.map(n => (
          <label key={n} className="inline-flex items-center gap-2">
            <input
              className="sr-only peer"
              type="radio"
              name={name}
              value={n}
              checked={value === n}
              onChange={handle}
              aria-label={`${n}`}
            />
            <span className="select-none px-3 py-2 rounded-lg border peer-checked:bg-brand-600 peer-checked:text-white peer-checked:border-brand-600 border-slate-300 cursor-pointer">{n}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
