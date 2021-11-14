function play() {
  return "Hello, World!"
}

if (typeof module !== 'undefined') {
  module.exports = play;
}
