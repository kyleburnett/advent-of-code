const fs = require('fs');

const [instructions, lines] = fs.readFileSync('input.txt', 'utf-8').trim().split('\n\n');
const network = new Map();
const re = /([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})\)/;
for (const line of lines.split('\n')) {
    const match = line.match(re);
    network.set(match[1], [match[2], match[3]]);
}
let steps = 0;
curr = 'AAA';
while (curr !== 'ZZZ') {
    for (let i = 0; i < instructions.length; ++i) {
        steps++;
        curr = network.get(curr)[instructions[i] === 'L' ? 0 : 1];
        if (curr === 'ZZZ') break;
    }
}
console.log('Part 1');
console.log(steps);
