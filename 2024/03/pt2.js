const fs = require('fs');

// xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))

const re = /(?:do\(\))|(?:don't\(\))|(?:mul\((\d{1,3}),(\d{1,3})\))/g;
const matches = fs.readFileSync('input.txt', 'utf-8').trim().matchAll(re);
let enabled = true;
let sum = 0;
for (const match of matches) {
    if (match[0] === "don't()") {
        enabled = false;
    } else if (match[0] === "do()") {
        enabled = true;
    } else if (enabled) {
        sum += parseInt(match[1], 10) * parseInt(match[2], 10);
    }
}
console.log('Part 2');
console.log(sum);
