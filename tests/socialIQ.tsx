import { TestKind, TestSpec } from '@utils/types'

const q = (id: string, prompt: string, options: string[], correctIndex: number) => ({ id, prompt, options, correctIndex })

const items = [
  q('q1', 'A coworker is unusually quiet. Best first step?', ['Ask in front of group', 'Check in privately', 'Ignore', 'Tell others'], 1),
  q('q2', 'Friend goes silent after feedback. Best reply?', ['“Are you mad?”', '“I hope I didn’t say that the wrong way—how did that come across?”', '“You always…”', 'Say nothing'], 1),
  q('q3', 'Someone interrupts repeatedly in a meeting.', ['Interrupt back', '“I’d like to finish my point.”', 'Tell them off', 'Stay quiet'], 1),
  q('q4', 'Friend shares a personal problem.', ['One-up them', '“That’s tough—how are you coping?”', '“It’ll be fine”', 'Change subject'], 1),
  q('q5', 'Two coworkers laugh after you spoke. Healthiest assumption?', ['They mock me', 'Might not be about me', 'Confront now', 'Gossip later'], 1),
  q('q6', 'Heated discussion; other raises voice.', ['Match tone', 'Lower voice, stay calm', 'Walk away silently', 'Yell “Calm down!”'], 1),
  q('q7', 'Friend seems jealous of your success.', ['Downplay success', 'Acknowledge feelings; show gratitude', 'Avoid them', 'Boast more'], 1),
  q('q8', 'Party: one person dominates talk.', ['Outtalk them', 'Steer topic to include others', 'Disengage', 'Tease them'], 1),
  q('q9', 'You unintentionally hurt someone.', ['“I didn’t mean it”', 'Apologize + ask how to make it right', 'Ignore', 'Defend intent'], 1),
  q('q10', 'Meeting someone shy.', ['Talk about yourself', 'Ask simple, open questions', 'Point out quietness', 'Wait for them'], 1)
]

export const socialIQSpec: TestSpec = {
  id: 'socialIQ',
  title: 'Social IQ Test',
  description: '10 items, single best answer (+1 per correct).',
  instructions: 'Choose the best response for each situation. Submit when all are answered.',
  kind: TestKind.MC,
  items,
  score: (answers) => {
    const correct = items.reduce((acc, it) => acc + ((answers[it.id] === it.correctIndex) ? 1 : 0), 0)
    const bands = (s: number) => s >= 9 ? 'High' : s >= 6 ? 'Good' : s >= 3 ? 'Developing' : 'Needs growth'
    return {
      score: correct,
      band: bands(correct),
      tips: [
        'Do private check-ins rather than public callouts.',
        'Reflect feelings you hear (“sounds frustrating”).',
        'Ask open questions to invite sharing.',
        'Regulate tone and pace to de-escalate.',
        'Repair after harm: apologize + ask how to make it right.'
      ]
    }
  }
}
