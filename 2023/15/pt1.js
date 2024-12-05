const fs = require('fs');

const sum = fs.readFileSync('input.txt', 'utf-8').trim().split(',').map(step => {
    let value = 0;
    for (let i = 0; i < step.length; ++i) {
        const code = step.charCodeAt(i);
        value += code;
        value *= 17;
        value %= 256;
    }
    return value;
}).reduce((prev, curr) => prev + curr, 0);
console.log('Part 1');
console.log(sum);
