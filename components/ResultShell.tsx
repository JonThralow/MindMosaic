import { ReactNode } from 'react'
import Card from './Card'

type Props = {
  title: string
  headline: string
  sub?: string
  children?: ReactNode
  tips?: string[]
  onRetake: () => void
  onHome: () => void
}
export default function ResultShell({ title, headline, sub, children, tips, onRetake, onHome }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <Card title={title} description={sub}>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{headline}</h1>
        {children && <div className="mt-4">{children}</div>}
        {tips && tips.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">How to grow</h3>
            <ul className="mt-2 list-disc pl-6 text-sm text-slate-700">
              {tips.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="btn btn-primary" onClick={onRetake}>Retake</button>
          <button className="btn btn-ghost" onClick={onHome}>Back to home</button>
        </div>
      </Card>
    </div>
  )
}
