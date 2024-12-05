const fs = require('fs');

let level = 0;
const str = fs.readFileSync('input.txt', 'utf-8').trim();
for (const instr of str) {
    level += (instr === '(') ? 1 : -1;
}
console.log('Part 1');
console.log(level);
