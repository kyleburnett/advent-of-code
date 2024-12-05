const { readGrid } = require('../../utils');

const grid = readGrid('input.txt');
let count = 0;
for (let i = 0; i < grid.length - 2; ++i) {
    for (let j = 0; j < grid[0].length - 2; ++j) {
        if (grid[i + 1][j + 1] === 'A' &&
            ((grid[i][j] === 'M' && grid[i + 2][j + 2] === 'S') ||
                (grid[i][j] === 'S' && grid[i + 2][j + 2] === 'M')) &&
            ((grid[i + 2][j] === 'M' && grid[i][j + 2] === 'S') ||
                (grid[i + 2][j] === 'S' && grid[i][j + 2] === 'M'))) {
            count++;
        }
    }
}
console.log('Part 2');
console.log(count);
