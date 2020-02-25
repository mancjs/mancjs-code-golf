function play(array) {
    return array.filter(number => number % 2 === 0)
}

if (typeof module !== 'undefined') {
    module.exports = play;
}
