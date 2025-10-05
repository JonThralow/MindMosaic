type Props = {
  name: string
  prompt: string
  value?: 'A' | 'B' | null
  onChange: (v: 'A' | 'B') => void
}
export default function ABRow({ name, prompt, value, onChange }: Props) {
  return (
    <fieldset className="card p-4">
      <legend className="font-medium text-slate-900">{prompt}</legend>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {(['A', 'B'] as const).map(letter => (
          <label key={letter} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name={name}
              className="h-4 w-4"
              checked={value === letter}
              onChange={() => onChange(letter)}
              aria-label={`${letter}`}
            />
            <span className="text-sm text-slate-800 font-semibold">{letter}.</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
