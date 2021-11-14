function play([a, b]) {
  return a % b;
}

if (typeof module !== 'undefined') {
  module.exports = play;
}
