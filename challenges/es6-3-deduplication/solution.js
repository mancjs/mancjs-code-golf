const fibs = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711];

var play = function (nums) {
  var arr = [];

  nums.forEach(n => {
    if (fibs.indexOf(n) !== -1) {
      arr.push(n);
      return;
    }

    if (arr.indexOf(n) === -1) {
      arr.push(n);
    }
  });

  return arr;
};