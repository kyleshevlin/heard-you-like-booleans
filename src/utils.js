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

/**
 * @url http://girfahelp.blogspot.com/2019/06/copy-current-url-to-clipboard-using.html
 */
function copyLink() {

  const dummy = document.createElement('input')
  const text = window.location.href;
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
}

module.exports = {
  copyLink,
  getBooleanTable,
}
