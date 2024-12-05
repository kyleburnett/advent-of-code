const fs = require('fs');

const sum = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(line => {
    const [l, w, h] = line.split('x').map(num => parseInt(num, 10)).sort((a, b) => a - b);
    console.log(l, w, h);
    return 3 * l * w + 2 * l * h + 2 * w * h;
}).reduce((prev, curr) => prev + curr, 0);
console.log('Part 1');
console.log(sum);
