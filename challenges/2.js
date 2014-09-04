// title  | Sort The Numbers
// input  | [10, 1, 150, 34, 300, 250, 12, 22, 23, 65, 33, 16, 1, 2]
// output | [1, 1, 2, 10, 12, 16, 22, 23, 33, 34, 65, 150, 250, 300]
// desc   | Sort the array of numbers passed to your play function in ascending order, returning a sorted array.

play = function(n) {
  a = []
  b = []
  for (i=0; i<n.length; i++)
    a[n[i]] ? a[n[i]+1] = n[i] : a[n[i]] = n[i]
  for (x=0; x<a.length; x++)
    if (a[x]) b.push(a[x])
  return b
}