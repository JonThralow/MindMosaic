export enum TestKind {
  MC = 'MC',        // multiple choice single best (A-D)
  Likert = 'Likert',
  AB = 'AB',
  BigFive = 'BigFive',
  IQ = 'IQ'
}

export type BaseQuestion = {
  id: string
  prompt: string
  reverse?: boolean
  scaleMin?: number
  scaleMax?: number
  options?: string[]
  correctIndex?: number
}

export type TestSpec = {
  id: string
  title: string
  description: string
  instructions: string
  kind: TestKind
  items: BaseQuestion[]
  score: (answers: ResponseRecord) => any
  cardHint?: string
}

export type ResponseRecord = Record<string, unknown>

export type TestRegistry = TestSpec[]
