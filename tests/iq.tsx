import { TestKind, TestSpec } from '@utils/types'

const q = (id: string, prompt: string, options: string[], correctIndex: number, why: string) =>
  ({ id, prompt, options, correctIndex, why })

const items = [
  q('q1', 'Series: 2, 6, 12, 20, 30 → ?', ['36', '40', '42', '44'], 2, 'Differences +4, +6, +8, +10; next +12 → 30 + 12 = 42.'),
  q('q2', 'Letters: A, C, F, J, O → ?', ['S', 'T', 'U', 'V'], 2, 'Jumps +1, +2, +3, +4; next +5 after O is U.'),
  q('q3', 'Odd one out: sphere, pyramid, cube, cylinder', ['sphere', 'pyramid', 'cube', 'cylinder'], 1, 'Cube, cylinder, sphere have curved/regular forms; pyramid stands out by apex-based faces.'),
  q('q4', 'Analogy: Hand is to Glove as Foot is to ?', ['Sock', 'Shoe', 'Sandal', 'Boot'], 0, 'Glove covers hand; sock similarly covers foot.'),
  q('q5', 'Syllogism: Some artists are chefs. Some chefs are musicians. Conclusion?', ['All chefs are artists', 'No chefs are artists', 'Some chefs are artists', 'No valid conclusion about chefs being artists'], 3, 'Given two “some” statements, no overlap is guaranteed.'),
  q('q6', 'If 7★4 = 45 and ★ means ab + a + b + 6, what is 5★5?', ['35', '39', '41', '45'], 2, 'Compute 5×5 + 5 + 5 + 6 = 25 + 10 + 6 = 41.'),
  q('q7', 'After a Pentagon comes a … ?', ['Heptagon', 'Hexagon', 'Octagon', 'Nonagon'], 1, 'Pentagon (5 sides) → Hexagon (6).'),
  q('q8', 'Matrix pattern: 2, 4, 8, … last = ?', ['12', '14', '16', '18'], 2, 'Doubling sequence: 2→4→8→16.'),
  q('q9', 'Most similar pair:', ['Brief – Concise', 'Strong – Fragile', 'Happy – Angry', 'Expand – Contract'], 0, '“Brief” and “Concise” are similar.'),
  q('q10', 'Work rate: 4 workers finish in 16 days. 8 workers need …?', ['4 days', '6 days', '8 days', '12 days'], 2, 'Work ∝ 1/(workers). Doubling workers halves time: 16/2 = 8 days.'),
  q('q11', 'Clock at 3:15 — angle between hands?', ['0°', '7.5°', '15°', '30°'], 1, 'Hour hand moves 0.5°/min; at 3:15 it’s at 97.5°. Minute hand at 90°. Difference 7.5°.'),
  q('q12', 'Set logic: If every piano player can read music, and Alex can read music, then Alex is a piano player?', ['True', 'False', 'Not enough info', 'Contradiction'], 2, 'Reading music is necessary but not sufficient to infer piano playing.')
]

export const iqSpec: TestSpec = {
  id: 'iq',
  title: 'IQ-style Reasoning',
  description: '12 items (A–D). +1 per correct; shows explanations after submit.',
  instructions: 'Choose the best answer. After submitting, you’ll see explanations for each item.',
  kind: TestKind.IQ,
  items: items.map(it => ({ id: it.id, prompt: it.prompt, options: it.options, correctIndex: it.correctIndex })),
  score: (answers) => {
    let score = 0
    const review: Array<{ q: number, correct: string, your: string, why: string }> = []
    items.forEach((it, idx) => {
      const yourIdx = Number(answers[it.id])
      const correct = it.options[it.correctIndex]
      const your = Number.isFinite(yourIdx) ? it.options[yourIdx] : ''
      if (yourIdx === it.correctIndex) score += 1
      review.push({ q: idx + 1, correct, your, why: it.why })
    })
    const band = score >= 11 ? 'Exceptional' : score >= 8 ? 'Strong' : score >= 5 ? 'Developing' : 'Beginner'
    return { score, band, review }
  }
}
