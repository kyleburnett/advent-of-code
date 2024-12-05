const fs = require('fs');
const _ = require('lodash');

const boxes = new Array(256).fill(0).map(_ => []);
fs.readFileSync('input.txt', 'utf-8').trim().split(',').forEach(step => {
    const re = /^([a-z]+)([=\-])([0-9]*)$/;
    const match = step.match(re);
    const label = match[1];
    const operation = match[2];
    const value = operation === '=' ? parseInt(match[3], 10) : null;

    // Compute hash
    let hash = 0;
    for (let i = 0; i < label.length; ++i) {
        const code = label.charCodeAt(i);
        hash += code;
        hash *= 17;
        hash %= 256;
    }

    const box = boxes[hash];
    if (operation === '=') {
        const index = _.findIndex(box, ['label', label]);
        if (index >= 0) {
            box.splice(index, 1, { label, value });
        } else {
            box.push({ label, value });
        }
    } else {
        const index = _.findIndex(box, ['label', label]);
        if (index >= 0) {
            box.splice(index, 1);
        }
    }
});
let sum = 0;
for (let i = 0; i < boxes.length; ++i) {
    for (let j = 0; j < boxes[i].length; ++j) {
        sum += (i + 1) * (j + 1) * boxes[i][j].value;
    }
}
console.log('Part 2');
console.log(sum);
