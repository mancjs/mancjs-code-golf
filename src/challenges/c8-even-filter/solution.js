function play(array) {
    return array.filter(number => number % 2)
}

if (typeof module !== 'undefined') {
    module.exports = play;
}