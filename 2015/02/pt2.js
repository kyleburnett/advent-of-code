const fs = require('fs');

const sum = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(line => {
    const [l, w, h] = line.split('x').map(num => parseInt(num, 10)).sort((a, b) => a - b);
    return 2 * l + 2 * w + l * w * h;
}).reduce((prev, curr) => prev + curr, 0);
console.log('Part 2');
console.log(sum);
