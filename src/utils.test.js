const { getBooleanTable } = require('./utils')

describe('getBooleanTable', () => {
  test('0 options', () => {
    expect(getBooleanTable(0)).toEqual([])
  })

  test('negative options', () => {
    expect(getBooleanTable(-97)).toEqual([])
  })

  test('1 option', () => {
    expect(getBooleanTable(1)).toEqual([[false], [true]])
  })

  test('2 options', () => {
    expect(getBooleanTable(2)).toEqual([
      [false, false],
      [false, true],
      [true, false],
      [true, true],
    ])
  })

  test('3 options', () => {
    expect(getBooleanTable(3)).toEqual([
      [false, false, false],
      [false, false, true],
      [false, true, false],
      [false, true, true],
      [true, false, false],
      [true, false, true],
      [true, true, false],
      [true, true, true],
    ])
  })
})
