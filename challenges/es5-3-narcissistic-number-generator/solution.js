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