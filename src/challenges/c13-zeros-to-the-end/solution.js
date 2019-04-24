function play(n){
    const zerosArray = n.filter(n => n === 0);
    const otherArray = n.filter(n => n!== 0);

    return [...otherArray, ...zerosArray];
}

if (typeof module !== 'undefined') {
    module.exports = play;
}