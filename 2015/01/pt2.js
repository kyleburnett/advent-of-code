const fs = require('fs');

let count = 0;
let level = 0;
const str = fs.readFileSync('input.txt', 'utf-8').trim();
for (const instr of str) {
    count++;
    level += (instr === '(') ? 1 : -1;
    if (level < 0) break;
}
console.log('Part 2');
console.log(count);
