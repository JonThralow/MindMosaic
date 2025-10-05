import { Outlet, Link, useLocation } from 'react-router-dom'
import Banner from '@components/Banner'

export default function App() {
  const location = useLocation()
  return (
    <div className="min-h-screen flex flex-col">
      <Banner />
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold text-brand-800 text-lg focus:outline-none focus:ring-2 focus:ring-brand-500 rounded">
            MindMosaic
          </Link>
          <span className="text-xs text-slate-500" aria-live="polite">{location.pathname === '/' ? 'Home' : 'Assessment'}</span>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="sticky bottom-0 z-10 bg-white/90 border-t">
        <div className="max-w-5xl mx-auto px-4 py-2 text-center text-xs text-slate-600">
          <strong>Informational only.</strong> Not medical or psychological advice.
        </div>
      </footer>
    </div>
  )
}
