import { TestKind, TestSpec } from '@utils/types'

/**
 * MBTI (20 items; A/B). 5 per dichotomy, A maps to the first letter.
 * Disclaimer: popular self-reflection, not diagnostic or predictive.
 * Since exact phrasings weren’t provided beyond constraints, we use clear, neutral prompts.
 */
type Pair = 'EI' | 'SN' | 'TF' | 'JP'
type MBTIItem = { id: string, pair: Pair, prompt: string, options: [string, string] }

export const mbtiItems: MBTIItem[] = [
  // E/I
  { id: 'q1', pair: 'EI', prompt: 'Energy at social events:', options: ['I feel energized and talk with many people.', 'I enjoy a few deep conversations or prefer to observe.'] },
  { id: 'q2', pair: 'EI', prompt: 'When processing ideas:', options: ['I think aloud and bounce thoughts off others.', 'I reflect internally before sharing.'] },
  { id: 'q3', pair: 'EI', prompt: 'Free evening preference:', options: ['Attend a gathering or activity with others.', 'Solo recharge time or one-on-one.'] },
  { id: 'q4', pair: 'EI', prompt: 'In meetings I typically:', options: ['Speak early to explore ideas.', 'Listen first and contribute later.'] },
  { id: 'q5', pair: 'EI', prompt: 'When learning:', options: ['Group discussions help me absorb.', 'Reading/thinking time helps most.'] },
  // S/N
  { id: 'q6', pair: 'SN', prompt: 'Information I trust most:', options: ['Concrete facts and present details.', 'Patterns, possibilities, and future implications.'] },
  { id: 'q7', pair: 'SN', prompt: 'When describing a trip:', options: ['I share specific places, times, and sights.', 'I share themes, meanings, and what it inspired.'] },
  { id: 'q8', pair: 'SN', prompt: 'Approach to problems:', options: ['Step-by-step using proven methods.', 'Leap to concepts and test novel angles.'] },
  { id: 'q9', pair: 'SN', prompt: 'Reading preference:', options: ['Practical how-tos.', 'Speculative or big-idea pieces.'] },
  { id: 'q10', pair: 'SN', prompt: 'Noticing:', options: ['What’s happening now.', 'What could happen next.'] },
  // T/F
  { id: 'q11', pair: 'TF', prompt: 'Decisions lean on:', options: ['Objective logic and criteria.', 'Values and impact on people.'] },
  { id: 'q12', pair: 'TF', prompt: 'Feedback style:', options: ['Direct and candid.', 'Supportive and care-forward.'] },
  { id: 'q13', pair: 'TF', prompt: 'Conflict focus:', options: ['Clarify facts and logic.', 'Repair feelings and trust.'] },
  { id: 'q14', pair: 'TF', prompt: 'Recognition:', options: ['For results achieved.', 'For effort and collaboration.'] },
  { id: 'q15', pair: 'TF', prompt: 'When judging ideas:', options: ['Is it correct and efficient?', 'Is it helpful and humane?'] },
  // J/P
  { id: 'q16', pair: 'JP', prompt: 'Work style:', options: ['Plan first; like closure.', 'Stay flexible; decide late.'] },
  { id: 'q17', pair: 'JP', prompt: 'Calendars and lists:', options: ['Essential tools I maintain.', 'Use as needed; keep options open.'] },
  { id: 'q18', pair: 'JP', prompt: 'Travel preference:', options: ['Itinerary with times.', 'Loose plan; follow spontaneity.'] },
  { id: 'q19', pair: 'JP', prompt: 'Mess vs. order:', options: ['Tidy up front to focus.', 'Organize when necessary.'] },
  { id: 'q20', pair: 'JP', prompt: 'Project deadlines:', options: ['Finish early; avoid last-minute rush.', 'Iterate until late; keep improving.'] }
]

export const mbtiSpec: TestSpec = {
  id: 'mbti',
  title: 'MBTI-Style Reflection',
  description: '20 A/B items across E–I, S–N, T–F, J–P. A maps to the first letter.',
  instructions: 'Choose A or B for each item. Majority per pair decides the letter. Ties are fine.',
  kind: TestKind.AB,
  items: mbtiItems.map(m => ({ id: m.id, prompt: `${m.prompt}\nA. ${m.options[0]}\nB. ${m.options[1]}`, options: m.options })),
  score: (answers) => {
    const pairs: Record<Pair, number> = { EI: 0, SN: 0, TF: 0, JP: 0 }
    mbtiItems.forEach(it => {
      const v = answers[it.id]
      if (v === 'A') pairs[it.pair] += 1
      else if (v === 'B') pairs[it.pair] -= 1
    })
    const letterFor = (pair: Pair) => {
      switch (pair) {
        case 'EI': return pairs.EI >= 0 ? 'E' : 'I'
        case 'SN': return pairs.SN >= 0 ? 'S' : 'N'
        case 'TF': return pairs.TF >= 0 ? 'T' : 'F'
        case 'JP': return pairs.JP >= 0 ? 'J' : 'P'
      }
    }
    const letters = `${letterFor('EI')}${letterFor('SN')}${letterFor('TF')}${letterFor('JP')}`
    const blurb = makeBlurb(letters)
    return { letters, blurb }
  }
}

function makeBlurb(type: string) {
  const [e, s, t, j] = type.split('')
  const parts: string[] = []
  parts.push((e === 'E' ? 'You tend to draw energy from interaction' : 'You tend to recharge through reflection') + ',')
  parts.push((s === 'S' ? 'prefer concrete details' : 'enjoy patterns and future possibilities') + ',')
  parts.push((t === 'T' ? 'weigh logic in decisions' : 'consider values and people impact') + ',')
  parts.push((j === 'J' ? 'and like structure/closure.' : 'and keep options open as you explore.'))
  return parts.join(' ')
}

export { mbtiItems }
