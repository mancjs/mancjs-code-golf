function play(string) {
    return string.split(' ')
}

if (typeof module !== 'undefined') {
    module.exports = play;
}