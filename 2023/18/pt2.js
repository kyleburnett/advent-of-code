const fs = require('fs');

const sum = fs.readFileSync('test.txt', 'utf-8').trim().split('\n').map(line => {
    return 0;
}).reduce((prev, curr) => prev + curr, 0);
console.log('Part 2');
console.log(sum);
