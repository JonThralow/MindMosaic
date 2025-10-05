import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '@components/Card'
import ProgressBadge from '@components/ProgressBadge'
import LikertRow from '@components/LikertRow'
import MCRow from '@components/MCRow'
import TraitBar from '@components/TraitBar'
import ResultShell from '@components/ResultShell'
import { TestRegistry, TestKind, ResponseRecord } from '@utils/types'
import { getTestById } from '@utils/scoring'
import { mbtiItems } from '@tests/mbti'
import { bigFiveSpec } from '@tests/bigfive'

export default function TestRunner() {
  const { id } = useParams()
  const navigate = useNavigate()
  const spec = useMemo(() => getTestById(id || ''), [id])

  const [answers, setAnswers] = useState<ResponseRecord>({})

  if (!spec) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Card title="Not found" description="That assessment ID does not exist.">
          <button className="btn btn-primary" onClick={() => navigate('/')}>Back to home</button>
        </Card>
      </div>
    )
  }

  const total = spec.items.length
  const answered = Object.values(answers).filter(v => v !== null && v !== undefined).length
  const allAnswered = answered === total

  const setAnswer = (qid: string, value: unknown) => {
    setAnswers(prev => ({ ...prev, [qid]: value }))
  }

  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<any>(null)

  const onSubmit = () => {
    if (!allAnswered) return
    const r = spec.score(answers)
    setResult(r)
    setSubmitted(true)
    // Scroll to results
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0)
  }

  const reset = () => {
    setAnswers({})
    setSubmitted(false)
    setResult(null)
  }

  // RENDER FORMS
  const renderForm = () => {
    switch (spec.kind) {
      case TestKind.MC:
        return (
          <div className="space-y-3">
            {spec.items.map((q, i) => (
              <MCRow
                key={q.id}
                name={q.id}
                prompt={`${i + 1}. ${q.prompt}`}
                options={q.options!}
                value={answers[q.id] as number | null}
                onChange={v => setAnswer(q.id, v)}
              />
            ))}
          </div>
        )
      case TestKind.Likert:
        return (
          <div className="space-y-3">
            {spec.items.map((q, i) => (
              <LikertRow
                key={q.id}
                id={q.id}
                name={q.id}
                label={`${i + 1}. ${q.prompt}`}
                value={answers[q.id] as number | null}
                onChange={v => setAnswer(q.id, v)}
                min={q.scaleMin!}
                max={q.scaleMax!}
              />
            ))}
          </div>
        )
      case TestKind.AB:
        return (
          <div className="space-y-3">
            {spec.items.map((q, i) => (
              <div key={q.id} className="card p-4">
                <p className="font-medium text-slate-900">{i + 1}. {q.prompt}</p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options!.map((opt, idx) => {
                    const letter = idx === 0 ? 'A' : 'B'
                    return (
                      <label key={idx} className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name={q.id}
                          className="h-4 w-4 mt-1"
                          checked={answers[q.id] === letter}
                          onChange={() => setAnswer(q.id, letter)}
                          aria-label={`${letter}`}
                        />
                        <span className="text-sm">
                          <span className="font-semibold">{letter}.</span> {opt}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )
      case TestKind.BigFive:
        return (
          <div className="space-y-3">
            {spec.items.map((q, i) => (
              <LikertRow
                key={q.id}
                id={q.id}
                name={q.id}
                label={`${i + 1}. ${q.prompt}`}
                value={answers[q.id] as number | null}
                onChange={v => setAnswer(q.id, v)}
                min={q.scaleMin!}
                max={q.scaleMax!}
              />
            ))}
          </div>
        )
      case TestKind.IQ:
        return (
          <div className="space-y-3">
            {spec.items.map((q, i) => (
              <MCRow
                key={q.id}
                name={q.id}
                prompt={`${i + 1}. ${q.prompt}`}
                options={q.options!}
                value={answers[q.id] as number | null}
                onChange={v => setAnswer(q.id, v)}
              />
            ))}
          </div>
        )
      default:
        return null
    }
  }

  // RENDER RESULTS
  const renderResults = () => {
    if (!submitted || !result) return null
    const goHome = () => navigate('/')
    const retake = () => reset()

    switch (spec.id) {
      case 'socialIQ': {
        const { score, band, tips } = result
        return (
          <ResultShell
            title="Social IQ Results"
            headline={`Score: ${score}/10 — ${band}`}
            sub="Interpretation bands: 9–10 High; 6–8 Good; 3–5 Developing; 0–2 Needs growth."
            tips={tips}
            onRetake={retake}
            onHome={goHome}
          />
        )
      }
      case 'narcissism': {
        const { sum, band, tips } = result
        return (
          <ResultShell
            title="Narcissism (Short)"
            headline={`Total: ${sum} — ${band}`}
            sub="Context: Educational only; not a diagnosis."
            tips={tips}
            onRetake={retake}
            onHome={goHome}
          />
        )
      }
      case 'eq': {
        const { sum, band, tips } = result
        return (
          <ResultShell
            title="Emotional Intelligence (Short)"
            headline={`Total: ${sum} — ${band}`}
            sub="Higher scores suggest stronger emotional skills."
            tips={tips}
            onRetake={retake}
            onHome={goHome}
          />
        )
      }
      case 'bigfive': {
        const { traits, habits } = result as { traits: Record<string, number>, habits: string[] }
        return (
          <ResultShell
            title="Big Five Snapshot"
            headline="Your trait profile"
            sub="Scaled to 0–100 from 1–7 item averages."
            tips={habits}
            onRetake={retake}
            onHome={goHome}
          >
            <div className="space-y-4">
              {Object.entries(traits).map(([k, v]) => (
                <TraitBar key={k} label={k} value={v} />
              ))}
            </div>
          </ResultShell>
        )
      }
      case 'mbti': {
        const { letters, blurb } = result as { letters: string, blurb: string }
        const letterLines = [
          'E — outward energy',
          'I — inward energy',
          'S — concrete sensing',
          'N — pattern-focused intuition',
          'T — logical thinking',
          'F — values-based feeling',
          'J — structured planning',
          'P — adaptable perceiving'
        ]
        return (
          <ResultShell
            title="MBTI-Style Reflection"
            headline={`Type: ${letters}`}
            sub="Popular self-reflection tool; not diagnostic or predictive."
            tips={[
              'Use your letters as starting points, not boxes.',
              'Try opposite-mode exercises weekly (e.g., if J, do one plan-free afternoon).',
              'Notice energy drains/boosts and adjust your routines.'
            ]}
            onRetake={retake}
            onHome={goHome}
          >
            <p className="text-slate-700">{blurb}</p>
            <ul className="mt-3 text-sm text-slate-700 list-disc pl-6">
              {letterLines.map((l, i) => <li key={i}>{l}</li>)}
            </ul>
          </ResultShell>
        )
      }
      case 'iq': {
        const { score, band, review } = result as { score: number, band: string, review: Array<{ q: number, correct: string, your: string, why: string }> }
        return (
          <ResultShell
            title="IQ-style Reasoning"
            headline={`Score: ${score}/12 — ${band}`}
            sub="No percentile claims. Explanations below."
            tips={[
              'Sketch patterns and write intermediate steps.',
              'Translate word problems into small equations.',
              'Re-check assumptions before committing.'
            ]}
            onRetake={retake}
            onHome={goHome}
          >
            <div className="mt-4 space-y-3">
              {review.map((r, i) => (
                <div key={i} className="card p-4">
                  <div className="text-sm text-slate-700">
                    <strong>Q{i + 1}.</strong> Correct: <span className="font-medium">{r.correct}</span> — Your answer: <span className="font-medium">{r.your || '—'}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-700"><span className="font-semibold">Why:</span> {r.why}</p>
                </div>
              ))}
            </div>
          </ResultShell>
        )
      }
      default:
        return null
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <Card
        title={spec.title}
        description={spec.description}
        actions={<ProgressBadge answered={answered} total={total} />}
      >
        <p className="text-sm text-slate-700">{spec.instructions}</p>
        <div className="mt-4">{renderForm()}</div>
        {!submitted && (
          <div className="mt-4">
            <button
              className="btn btn-primary"
              onClick={onSubmit}
              disabled={!allAnswered}
              aria-disabled={!allAnswered}
            >
              Submit
            </button>
          </div>
        )}
      </Card>
      {renderResults()}
    </div>
  )
}
