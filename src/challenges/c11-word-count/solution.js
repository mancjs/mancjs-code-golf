function play(text) {
  const punctuation = ".,!?";
  return text.split(" ").filter(w => !!w && punctuation.indexOf(w) === -1).length;
}

if (typeof module !== 'undefined') {
  module.exports = play;
}
