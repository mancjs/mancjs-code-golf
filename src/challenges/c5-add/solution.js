function play([a, b]) {
  // return evil(['a', String.fromCharCode(43), 'b'].join(''));

  function getSum(a, b) {
    if (b === 0) {
      return a;
    } else {
      return getSum(a ^ b, (a & b) << 1)
    }
  };

  return getSum(a, b);
}

if (typeof module !== 'undefined') {
  module.exports = play;
}
