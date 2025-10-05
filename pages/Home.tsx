import { Link } from 'react-router-dom'
import Card from '@components/Card'

const tests = [
  {
    id: 'socialIQ',
    title: 'Social IQ Test',
    description: '10 situational questions that assess practical interpersonal judgment.'
  },
  {
    id: 'narcissism',
    title: 'Narcissism (Short)',
    description: '10-item reflection on admiration-seeking and self-focus (Likert 1–5).'
  },
  {
    id: 'eq',
    title: 'Emotional Intelligence (Short)',
    description: '12 items on emotion skills; some items are reverse-scored.'
  },
  {
    id: 'bigfive',
    title: 'Big Five Snapshot',
    description: '10-item TIPI-style. Visual 0–100 profile across five traits.'
  },
  {
    id: 'mbti',
    title: 'MBTI-Style Reflection',
    description: '20 A/B items across EI, SN, TF, JP. Popular, not diagnostic.'
  },
  {
    id: 'iq',
    title: 'IQ-style Reasoning',
    description: '12 mixed items with explanations. No percentile claims.'
  }
]

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">MindMosaic Self Assessments</h1>
        <p className="text-slate-600">Friendly, fast check-ins for learning about yourself. <span className="font-medium">Educational only—not a diagnosis.</span></p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tests.map(t => (
          <Card key={t.id} title={t.title} description={t.description} actions={
            <Link to={`/test/${t.id}`} className="btn btn-primary" aria-label={`Start ${t.title}`}>Start</Link>
          } />
        ))}
      </div>
    </div>
  )
}
