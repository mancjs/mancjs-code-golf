function play(words) {
  const isPalindrome = (str) => {
    return str == str.split("").reverse().join("");
  };

  return words.filter(isPalindrome).length;
}

if (typeof module !== "undefined") {
  module.exports = play;
}
