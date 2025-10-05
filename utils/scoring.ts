import { TestKind, TestRegistry, TestSpec, ResponseRecord } from './types'
import { socialIQSpec } from '@tests/socialIQ'
import { narcissismSpec } from '@tests/narcissism'
import { eqSpec } from '@tests/eq'
import { bigFiveSpec } from '@tests/bigfive'
import { mbtiSpec } from '@tests/mbti'
import { iqSpec } from '@tests/iq'

export const registry: TestRegistry = [
  socialIQSpec,
  narcissismSpec,
  eqSpec,
  bigFiveSpec,
  mbtiSpec,
  iqSpec
]

export function getTestById(id: string): TestSpec | undefined {
  return registry.find(t => t.id === id)
}

// Helpers
export const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

export const map1to7ToPercent = (x: number) => {
  // Linear map: 1 -> 0, 7 -> 100
  const p = ((x - 1) / (7 - 1)) * 100
  return clamp(p, 0, 100)
}

export function sumLikert(items: { id: string, reverse?: boolean }[], answers: ResponseRecord, min: number, max: number) {
  let total = 0
  items.forEach(it => {
    const raw = Number(answers[it.id])
    if (Number.isFinite(raw)) {
      const v = it.reverse ? (min + max - raw) : raw
      total += v
    }
  })
  return total
}
