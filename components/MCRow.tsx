type Props = {
  name: string
  prompt: string
  options: string[]
  value?: number | null
  onChange: (v: number) => void
}
export default function MCRow({ name, prompt, options, value, onChange }: Props) {
  const labels = ['A', 'B', 'C', 'D', 'E', 'F']
  return (
    <fieldset className="card p-4">
      <legend className="font-medium text-slate-900">{prompt}</legend>
      <div className="mt-3 flex flex-col gap-2">
        {options.map((opt, idx) => (
          <label key={idx} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name={name}
              className="h-4 w-4"
              checked={value === idx}
              onChange={() => onChange(idx)}
              aria-label={`${labels[idx]}. ${opt}`}
            />
            <span className="text-sm text-slate-800"><span className="font-semibold">{labels[idx]}.</span> {opt}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
