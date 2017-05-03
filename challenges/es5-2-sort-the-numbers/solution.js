play = function(n) {
  a = []
  b = []
  for (i=0; i<n.length; i++)
    a[n[i]] ? a[n[i]+1] = n[i] : a[n[i]] = n[i]
  for (x=0; x<a.length; x++)
    if (a[x]) b.push(a[x])
  return b
}