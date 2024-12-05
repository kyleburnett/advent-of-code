const fs = require('fs');

const [timesLine, distancesLine] = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');
const time = parseInt(timesLine.split(/:\s+/)[1].split(/\s+/).join(''), 10);
const distance = parseInt(distancesLine.split(/:\s+/)[1].split(/\s+/).join(''), 10);

let count = 0;
for (let hold = 1; hold < time; ++hold) {
    const achieved = (time - hold) * hold;
    if (achieved > distance) count++;
}
console.log('Part 2');
console.log(count);
