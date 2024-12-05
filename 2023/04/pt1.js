const fs = require('fs');

const sum = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map((line) => {
    const [cardInfo, cardNumbers] = line.split(': ');
    const [winningStr, playerStr] = cardNumbers.split(' | ');
    const winningNumbers = winningStr.trim().split(/ +/).map(num => parseInt(num, 10));
    const playerNumbers = playerStr.trim().split(/ +/).map(num => parseInt(num, 10));
    const scored = _.intersection(winningNumbers, playerNumbers);
    const points = scored.length === 0 ? 0 : Math.pow(2, scored.length - 1);
    return points;
}).reduce((prev, curr) => prev + curr, 0);
console.log('Part 1');
console.log(sum);
