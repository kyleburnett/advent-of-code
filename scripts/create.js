const fs = require('fs');
const fspath = require('path');

function createPart(num) {
    return `const fs = require('fs');

const sum = fs.readFileSync('test.txt', 'utf-8').trim().split('\\n').map(line => {
    return 0;
}).reduce((prev, curr) => prev + curr, 0);
console.log('Part ${num}');
console.log(sum);
`;
}

const year = process.argv[2];
const day = process.argv[3];
const dir = fspath.join(year, day.padStart(2, '0'));
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(fspath.join(dir, 'pt1.js'), createPart(1));
fs.writeFileSync(fspath.join(dir, 'pt2.js'), createPart(2));
fs.writeFileSync(fspath.join(dir, 'test.txt'), '');
fs.writeFileSync(fspath.join(dir, 'input.txt'), '');
