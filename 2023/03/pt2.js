const fs = require('fs');
const _ = require('lodash');

function findParts(grid, row, col) {
    const parts = [];
    for (let i = Math.max(row - 1, 0); i < Math.min(row + 2, grid.length); ++i) {
        const line = grid[i];
        const NUM_REG = /[0-9]+/g;
        let res;
        while ((res = NUM_REG.exec(line))) {
            const match = res[0];
            const number = parseInt(match);
            const start = res.index;
            const end = start + match.length - 1;
            if ((start < col && end >= col - 1) || start === col || start === col + 1) {
                parts.push(number);
            }
        }
    }
    return parts;
}

const sum = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map((line, i, grid) => {
    let total = 0;
    let gearIndex = -1;
    while (true) {
        gearIndex = line.indexOf('*', gearIndex + 1);
        if (gearIndex < 0) break;
        parts = findParts(grid, i, gearIndex);
        if (parts.length === 2) {
            total += (parts[0] * parts[1]);
        }
    }
    return total;
}).reduce((prev, curr) => prev + curr, 0);
console.log('Part 2');
console.log(sum);
