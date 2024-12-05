const fs = require('fs');

const re = /mul\((\d{1,3}),(\d{1,3})\)/g;
const matches = fs.readFileSync('input.txt', 'utf-8').trim().matchAll(re);
let sum = 0;
for (const match of matches) {
    sum += parseInt(match[1], 10) * parseInt(match[2], 10);
}
console.log('Part 1');
console.log(sum);
