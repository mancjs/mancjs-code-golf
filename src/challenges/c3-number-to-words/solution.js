const th = ['', 'thousand', 'million', 'billion', 'trillion'];
const dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

/**
 * @param {number} num 
 */
function play(num) {
  let s = num.toString();
  s = s.replace(/[\, ]/g, '');
  if (s !== parseFloat(s).toString()) return 'not a number';
  const x = s.length;
  const n = s.split('');
  let str = '';
  let sk = 0;
  for (let i = 0; i < x; i += 1) {
    if ((x - i) % 3 === 2) {
      if (n[i] === '1') {
        str += tn[Number(n[i + 1])] + ' ';
        i += 1;
        sk = 1;
      } else if (n[i] !== '0') {
        str += tw[parseInt(n[i], 10) - 2] + ' ';
        sk = 1;
      }
    } else if (n[i] !== '0') {
      str += dg[parseInt(n[i], 10)] + ' ';
      if ((x - i) % 3 === 0) str += 'hundred ';
      sk = 1;
    }
    if ((x - i) % 3 === 1) {
      if (sk) {
        str += th[(x - i - 1) / 3] + ' ';
      }
      sk = 0;
    }
  }
  return str.replace(/\s+/g, ' ').trim();
}

if (typeof module !== 'undefined') {
  module.exports = play;
}
