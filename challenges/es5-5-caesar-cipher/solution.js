play = function(s) {
  return s.split('').map(function(_) {
    if (!_.match(/[A-za-z]/)) return _;
    c = Math.floor(_.charCodeAt(0) / 97);
    k = (_.toLowerCase().charCodeAt(0) - 83) % 26 || 26;
    return String.fromCharCode(k + ((c == 0) ? 64 : 96));
  }).join('');
}