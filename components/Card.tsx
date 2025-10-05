import { ReactNode } from 'react'

type Props = {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}

export default function Card({ title, description, actions, children }: Props) {
  return (
    <section className="card p-4 sm:p-6">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-slate-900">{title}</h2>
          {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </header>
      {children && <div className="mt-4">{children}</div>}
    </section>
  )
}
