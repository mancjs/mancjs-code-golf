// title  | Number Reader
// input  | 77209536
// output | "seven seven two zero nine five three six"
// desc   | Write a program that takes a number and converts it to the equivalant string, i.e. 12341 -> "one two three four one"

play = function(n) {
  a = []
  n += ''
  for (i=0; i<n.length; i++)
    a.push(['zero',0,'two','three',0,'five','six','seven',0,'nine'][n[i]])
  return a.join(' ')
}