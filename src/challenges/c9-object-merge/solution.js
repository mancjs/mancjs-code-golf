function play(objs) {
  return {...objs[0], ...objs[1], ...objs[2]}
}

if (typeof module !== 'undefined') {
  module.exports = play;
}
