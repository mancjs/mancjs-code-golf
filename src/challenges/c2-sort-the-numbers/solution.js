function play(n) {
  const a = [];
  const b = [];
  for (let i = 0; i < n.length; i += 1) {
    a[n[i]] ? a[n[i] + 1] = n[i] : a[n[i]] = n[i];
  }
  for (let x = 0; x < a.length; x += 1) {
    if (a[x]) b.push(a[x]);
  }
  return b;
};

if (typeof module !== 'undefined') {
  module.exports = play;
}
