function play(n){ return Math.floor(n/60)+':'+n%60}

if (typeof module !== 'undefined') {
    module.exports = play;
}