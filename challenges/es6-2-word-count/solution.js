var play = function (i) {
  return i[0].match(new RegExp('\\b' + i[1] + '\\b', 'gi')).length;
};