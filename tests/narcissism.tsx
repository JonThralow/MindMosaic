import { TestKind, TestSpec } from '@utils/types'
import { sumLikert } from '@utils/scoring'

const prompts = [
  'I like being the center of attention.',
  'I often feel more capable than others.',
  'Compliments make me feel proud.',
  'I get frustrated if my efforts go unnoticed.',
  'I prefer to be in control.',
  'I enjoy talking about my successes.',
  'I seek admiration from others.',
  'I dislike being criticized.',
  'I sometimes exaggerate my accomplishments.',
  'I feel I deserve special treatment.'
]

const items = prompts.map((p, i) => ({
  id: `q${i + 1}`,
  prompt: p,
  scaleMin: 1,
  scaleMax: 5
}))

export const narcissismSpec: TestSpec = {
  id: 'narcissism',
  title: 'Narcissism (Short)',
  description: '10 items, Likert 1–5. Sum 10–50.',
  instructions: 'Rate each statement from 1 (Strongly disagree) to 5 (Strongly agree).',
  kind: TestKind.Likert,
  items,
  score: (answers) => {
    const sum = sumLikert(items, answers, 1, 5)
    const band = sum <= 20 ? 'Low traits' : sum <= 35 ? 'Moderate' : 'High'
    return {
      sum,
      band,
      tips: [
        'Use humble language and credit the team.',
        'Welcome feedback; ask, “What’s one thing to improve?”',
        'Praise effort and process, not status.',
        'Build stable self-worth beyond comparison.',
        'Practice perspective-taking before responding.'
      ]
    }
  }
}
