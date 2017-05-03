const isPalindrome = (str) => {
  return str == str.split('').reverse().join('');
};

var play = function (words) {
  return words.filter(isPalindrome).length;
};