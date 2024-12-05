const fs = require('fs');
const lcm = require('compute-lcm');

const [instructions, lines] = fs.readFile('input.txt', 'utf-8').trim().split('\n\n');
const network = new Map();
const re = /([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})\)/;
const curr = [];
for (const line of lines.split('\n')) {
    const match = line.match(re);
    network.set(match[1], [match[2], match[3]]);
    if (match[1][match[1].length - 1] === 'A') { // Check if last letter is A
        curr.push(match[1]);
    }
}
let steps = curr.map(item => 0);
for (let i = 0; i < curr.length; ++i) {
    let current = curr[i];
    while (current[current.length - 1] !== 'Z') {
        for (let j = 0; j < instructions.length; ++j) {
            steps[i]++;
            current = network.get(current)[instructions[j] === 'L' ? 0 : 1];
            if (current[current.length - 1] === 'Z') break;
        }
    }
}
console.log('Part 2');
console.log(lcm(...steps));
