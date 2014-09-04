// title  | Narcissistic Number Generator
// input  | [5, 400]
// output | [407, 1634, 8208, 9474, 54748]
// desc   | Generate the next X narcissistic numbers larger than the number Y, where your play function is called with the array [X, Y]. Return your answer in an array.

is = function(n) {
  x = n + '', t=0
  for (i=0; i<x.length; i++)
    t += Math.pow(x[i], x.length)
  return t == n
}

play = function(args) {
  a = []
  for (b=args[1]; b<100000; b++) {
    if (is(b)) a.push(b)
    if (a.length >= args[0]) break;
  }

  return a
}