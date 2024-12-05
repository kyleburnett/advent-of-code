const fs = require('fs');
const crypto = require('crypto');

const key = fs.readFileSync('input.txt', 'utf-8').trim();
let i = 0;
while (true) {
    const text = crypto.createHash('md5').update(`${key}${i}`).digest("hex");
    if (text.startsWith('00000')) break;
    i++;
}
console.log('Part 1');
console.log(i);
