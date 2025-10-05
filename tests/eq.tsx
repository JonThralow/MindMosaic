import { TestKind, TestSpec } from '@utils/types'
import { sumLikert } from '@utils/scoring'

const prompts = [
  'I can read the tone of voice in conversations.',
  'I notice how my mood affects my decisions.',
  'I can calm myself when upset.',
  'I notice subtle facial changes in others.',
  '(R) I react before thinking.',
  'I adapt my communication to the audience.',
  'I can name what I’m feeling.',
  '(R) I struggle to bounce back after criticism.',
  'I can motivate myself to begin tasks.',
  'I can sense tension in a room.',
  '(R) I avoid talking about emotions.',
  'I handle conflicts constructively.'
]

const items = prompts.map((p, i) => ({
  id: `q${i + 1}`,
  prompt: p.replace('(R) ', ''),
  reverse: p.startsWith('(R)'),
  scaleMin: 1,
  scaleMax: 5
}))

export const eqSpec: TestSpec = {
  id: 'eq',
  title: 'Emotional Intelligence (Short)',
  description: '12 items, Likert 1–5. Reverse-score 5, 8, 11.',
  instructions: 'Rate 1 (Strongly disagree) to 5 (Strongly agree). Some items are reverse-scored.',
  kind: TestKind.Likert,
  items,
  score: (answers) => {
    const sum = sumLikert(items, answers, 1, 5)
    const band = sum >= 51 ? 'Very high' : sum >= 39 ? 'Solid' : sum >= 26 ? 'Developing' : 'Needs focus'
    return {
      sum,
      band,
      tips: [
        'Do brief mood check-ins (name intensity 0–10).',
        'Name-it-to-tame-it: label feelings before acting.',
        'Pause—breathe—choose when triggered.',
        'Offer perspective summaries (“So you’re saying…”).',
        'Hold short after-action reflections post-conflict.'
      ]
    }
  }
}
