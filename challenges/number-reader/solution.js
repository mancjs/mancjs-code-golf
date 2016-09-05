play = function(n) {
  a = []
  n += ''
  for (i=0; i<n.length; i++)
    a.push(['zero',0,'two','three',0,'five','six','seven',0,'nine'][n[i]])
  return a.join(' ')
}