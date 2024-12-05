const fs = require('fs');

function predictPrev(values) {
    if (values.every(val => val === 0)) return 0;
    const derived = [];
    for (let i = 0; i < values.length - 1; ++i) {
        derived.push(values[i + 1] - values[i]);
    }
    derived.unshift(predictPrev(derived));
    return values[0] - derived[0];
}

const total = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(line => {
    const values = line.split(' ').map(val => parseInt(val));
    return predictPrev(values);
}).reduce((prev, curr) => prev + curr, 0);
console.log('Part 2');
console.log(total);
