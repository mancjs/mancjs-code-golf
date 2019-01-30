function play(string) {
    return string
        .split('')
        .sort()
        .join('');
}

if (typeof module !== 'undefined') {
    module.exports = play;
}