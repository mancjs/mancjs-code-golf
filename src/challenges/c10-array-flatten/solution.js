function play(arrays) {
  return [...arrays[2], ...arrays[1], ...arrays[0]]
}

if (typeof module !== 'undefined') {
  module.exports = play;
}
