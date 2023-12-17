import { describe, expect } from '@jest/globals'
import sum from './check'

describe('Math', () => {
  it('Should have 4 after 2 plus 2', () => {
    const a: number = 2
    const b: number = 2
    expect(sum(a, b)).toBe(4)
  })
})
