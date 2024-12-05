const fs = require('fs');
const _ = require('lodash');

const CHAR_0 = '0'.charCodeAt(0);
const CHAR_9 = '9'.charCodeAt(0);

function isPartNumber(grid, row, start, end, max) {
    for (let i = Math.max(start - 1, 0); i < Math.min(end + 2, max); ++i) {
        // Check top
        if (row > 0 && grid[row - 1][i] !== '.') return true;
        // Check bottom
        if (row + 1 < grid.length && grid[row + 1][i] !== '.') return true;
    }
    // Check left
    if (start > 0 && grid[row][start - 1] !== '.') return true;
    // Check right
    if (end + 1 < max && grid[row][end + 1] !== '.') return true;
    return false;
}

const sum = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map((line, i, grid) => {
    let total = 0;
    let start = null;
    let num = '';
    for (let j = 0; j < line.length; ++j) {
        const char = line[j];
        const code = char.charCodeAt(0);
        if (code >= CHAR_0 && code <= CHAR_9) {
            if (typeof start !== 'number') start = j;
            num += char;
        } else if (num.length) {
            if (isPartNumber(grid, i, start, j - 1, line.length)) {
                total += parseInt(num);
            }
            start = null;
            num = '';
        }
    }
    if (num.length && isPartNumber(grid, i, start, line.length - 1, line.length)) {
        total += parseInt(num);
    }
    return total;
}).reduce((prev, curr) => prev + curr, 0);
console.log('Part 1');
console.log(sum);
