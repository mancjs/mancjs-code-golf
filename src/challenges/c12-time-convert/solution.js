function play(num) {
    const hours = Math.floor(num/60);
    const minutes = num % 60;
    return hours + ":" + minutes;
}

if (typeof module !== 'undefined') {
    module.exports = play;
}