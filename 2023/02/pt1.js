const fs = require('fs');

const TOTALS = [
    ['red', 12],
    ['green', 13],
    ['blue', 14]
];

const sum = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(line => {
    [info, game] = line.split(': ');
    const id = parseInt(info.split(' ')[1]);
    const possible = game.split('; ').every(round => {
        return round.split(', ').every(pull => {
            const [num, color] = pull.trim().split(' ');
            for (const [availableColor, availableNumber] of TOTALS) {
                if (availableColor === color && num > availableNumber) {
                    return false;
                }
            }
            return true;
        });
    });
    return possible ? id : 0;
}).reduce((prev, curr) => prev + curr, 0);
console.log('Part 1', sum);
