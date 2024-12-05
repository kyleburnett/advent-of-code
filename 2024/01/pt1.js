const fs = require('fs');

const list = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(line => line.split(/\s+/));
const left = list.map(pair => pair[0]).sort();
const right = list.map(pair => pair[1]).sort();
let sum = 0;
for (let i = 0; i < left.length; ++i) {
    sum += Math.abs(left[i] - right[i]);
}
console.log('Part 1');
console.log(sum);
