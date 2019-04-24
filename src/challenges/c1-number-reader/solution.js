function play(n){return [...n+=''].map(c =>['zero',0,'two','three', 0,'five','six','seven',0,'nine'][c]).join(' ')}

if (typeof module !== 'undefined') {
    module.exports = play;
}