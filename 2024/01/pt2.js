const fs = require('fs');

const list = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(line => line.split(/\s+/));
const left = list.map(pair => parseInt(pair[0], 10));
const right = list.map(pair => parseInt(pair[1], 10)).sort();
let score = 0;
let i = 0;
for (const num of left) {
    let index = right.findIndex(r => r === num);
    if (index < 0) {
        continue;
    } else {
        let count = 0;
        while (index < right.length && right[index] === num) {
            count++;
            index++;
        }
        score += num * count;
    }
}
console.log('Part 2');
console.log(score);
