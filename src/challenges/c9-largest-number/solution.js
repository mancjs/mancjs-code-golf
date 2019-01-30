function play(array) {
    return Math.max(...array)
}

if (typeof module !== 'undefined') {
    module.exports = play;
}