function isPrime(num) {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

function play(n) {
  const arr = [2];
  for (let i = 3; i < n; i += 2) {
    if (isPrime(i)) {
      arr.push(i);
    }
  }
  return arr;
}

if (typeof module !== 'undefined') {
  module.exports = play;
}
