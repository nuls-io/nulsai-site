import Decimal, { Numeric } from 'decimal.js-light'
// import seedrandom from 'seedrandom'

export function randomMaxMin(max: Numeric, min: Numeric = 0): Decimal {
  const maxd = new Decimal(max)
  const mind = new Decimal(min)
  if (mind.gt(maxd)) {
    throw new Error('max should greater than min')
  }
  const diff = maxd.minus(mind)
  const r = Math.random()
  const num = diff.mul(r).add(mind)
  return num
}

export function randomStepMaxMin(
  step: Numeric,
  max: Numeric,
  min: Numeric = 0
): Decimal {
  const stepd = new Decimal(step)
  const num = randomMaxMin(max, min)
  if (stepd.gt(num)) {
    throw new Error('step too large')
  }
  const count = num.div(stepd).toInteger()
  return stepd.mul(count)
}

export function randomMaxMinCount(
  count: number,
  max: Numeric,
  min: Numeric = 0
): Decimal[] {
  if (count <= 0) {
    throw new Error('count should greater then 0')
  }
  const ret: Decimal[] = []
  for (let i = 0; i < count; i++) {
    ret.push(randomMaxMin(max, min))
  }
  ret.sort((a, b) => {
    if (a.lt(b)) {
      return -1
    }
    if (a.gt(b)) {
      return 1
    }
    // a must be equal to b
    return 0
  })
  return ret
}

// export function definiteRandom(seed: string, salt = ''): number {
//   const rng = seedrandom(seed + salt)
//   return rng()
// }

export function randomMembers<T>(arr: T[], count: number): T[] {
  // Shuffle array
  const shuffled = arr.sort(() => 0.5 - Math.random())

  // Get sub-array of first n elements after shuffled
  return shuffled.slice(0, count)
}
