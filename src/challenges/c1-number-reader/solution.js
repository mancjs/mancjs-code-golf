function play(n) {
  const a = []
  n += ''
  for (let i = 0; i < n.length; i++)
    a.push(['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'][n[i]])
  return a.join(' ')
}

if (typeof module !== 'undefined') {
  module.exports = play;
}
