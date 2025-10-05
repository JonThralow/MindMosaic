import { TestKind, TestSpec } from '@utils/types'
import { map1to7ToPercent } from '@utils/scoring'

export const bigFiveItems = [
  { id: 'q1',  prompt: 'Extraverted',                reverse: false },
  { id: 'q2',  prompt: 'Reserved',                   reverse: true  },
  { id: 'q3',  prompt: 'Critical',                   reverse: true  },
  { id: 'q4',  prompt: 'Sympathetic',                reverse: false },
  { id: 'q5',  prompt: 'Dependable',                 reverse: false },
  { id: 'q6',  prompt: 'Disorganized',               reverse: true  },
  { id: 'q7',  prompt: 'Anxious',                    reverse: false },
  { id: 'q8',  prompt: 'Calm',                       reverse: true  },
  { id: 'q9',  prompt: 'Open to new experiences',    reverse: false },
  { id: 'q10', prompt: 'Conventional',               reverse: true  }
].map(it => ({ ...it, scaleMin: 1, scaleMax: 7 }))

export const bigFiveSpec: TestSpec = {
  id: 'bigfive',
  title: 'Big Five Snapshot',
  description: '10-item TIPI-style (Likert 1–7).',
  instructions: 'Rate 1 (Strongly disagree) to 7 (Strongly agree).',
  kind: TestKind.BigFive,
  items: bigFiveItems,
  score: (answers) => {
    const get = (id: string, rev: boolean) => {
      const v = Number(answers[id])
      if (!Number.isFinite(v)) return null
      const adjusted = rev ? (8 - v) : v
      return adjusted
    }
    // Trait scoring
    const extraversion = average([get('q1', false), get('q2', true)])
    const agreeableness = average([get('q3', true), get('q4', false)])
    const conscientiousness = average([get('q5', false), get('q6', true)])
    const neuroticism = average([get('q7', false), get('q8', true)])
    const openness = average([get('q9', false), get('q10', true)])

    const traits = {
      Extraversion: map1to7ToPercent(extraversion),
      Agreeableness: map1to7ToPercent(agreeableness),
      Conscientiousness: map1to7ToPercent(conscientiousness),
      Neuroticism: map1to7ToPercent(neuroticism),
      Openness: map1to7ToPercent(openness)
    }

    const habits = makeHabits(traits)

    return { traits, habits }
  }
}

function average(nums: Array<number | null>) {
  const vals = nums.filter((n): n is number => typeof n === 'number')
  return vals.reduce((a, b) => a + b, 0) / vals.length
}

function makeHabits(traits: Record<string, number>) {
  const habits: string[] = []
  if (traits['Conscientiousness'] < 50) habits.push('Adopt a 5-minute daily planning ritual.')
  else habits.push('Batch tasks and use checklists to leverage your orderliness.')

  if (traits['Extraversion'] < 50) habits.push('Schedule one social micro-ritual (e.g., a daily check-in).')
  else habits.push('Protect solo focus blocks to balance high sociability.')

  if (traits['Agreeableness'] < 50) habits.push('Practice “kind candor”: one honest note + one care statement.')
  else habits.push('Use your empathy to mediate small team tensions.')

  if (traits['Neuroticism'] > 50) habits.push('Use “name–normalize–next step” during stress.')
  else habits.push('Share calm routines with teammates during crunch times.')

  if (traits['Openness'] < 50) habits.push('Try a weekly “new thing” (article, cuisine, route).')
  else habits.push('Channel curiosity into structured experiments.')
  return habits
}

export { bigFiveSpec }
