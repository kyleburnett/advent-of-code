const fs = require('fs');

const [timesLine, distancesLine] = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');
const times = timesLine.split(/:\s+/)[1].split(/\s+/).map(num => parseInt(num, 10));
const distances = distancesLine.split(/:\s+/)[1].split(/\s+/).map(num => parseInt(num, 10));

const counts = [];
for (let i = 0; i < times.length; ++i) {
    const time = times[i];
    const distance = distances[i];
    let count = 0;
    for (let hold = 1; hold < time; ++hold) {
        const achieved = (time - hold) * hold;
        if (achieved > distance) count++;
    }
    counts.push(count);
}
const answer = counts.reduce((prev, curr) => prev * curr, 1);
console.log('Part 1');
console.log(answer);
