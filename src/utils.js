function getBooleanTable(number) {
  if (number <= 0) {
    return []
  }

  const result = Array(Math.pow(2, number))
    .fill()
    .map((_, idx) => idx)
    .map(num => num.toString(2).padStart(number, '0'))
    .map(stringOfBits =>
      stringOfBits.split('').map(bit => {
        if (bit === '0') return false
        if (bit === '1') return true
      })
    )

  return result
}

module.exports = {
  getBooleanTable,
}
