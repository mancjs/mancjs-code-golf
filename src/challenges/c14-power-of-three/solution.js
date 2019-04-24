function play(n){
    return (n%3) == 0;
}

if (typeof module !== 'undefined') {
    module.exports = play;
}