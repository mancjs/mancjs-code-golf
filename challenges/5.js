// title  | Implement ROT13 / Caesar cipher
// input  | "aabbbxXxyyzzzz"
// output | "nnoookKkllmmmm"
// desc   | Implement a ROT13 cipher that preserves case. Only a-zA-Z characters need to be considered. Your play function will be called with a string, return a ROT13 version of the string.

play = function(s) {
  return s.split('').map(function(_) {
    if (!_.match(/[A-za-z]/)) return _;
    c = Math.floor(_.charCodeAt(0) / 97);
    k = (_.toLowerCase().charCodeAt(0) - 83) % 26 || 26;
    return String.fromCharCode(k + ((c == 0) ? 64 : 96));
  }).join('');
}