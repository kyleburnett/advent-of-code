const { readGrid } = require('../../utils');

function pivot(grid) {
    const pivoted = new Array(grid[0].length).fill(0).map(() => new Array(grid.length).fill(0));
    for (let i = 0; i < grid.length; ++i) {
        for (let j = 0; j < grid[i].length; ++j) {
            pivoted[j][i] = grid[i][j];
        }
    }
    return pivoted;
}

const grid = readGrid('input.txt');
const pivotGrid = pivot(grid);
const diagonalRightGrid = pivot(grid.map((cells, idx, arr) => {
    const left = arr.length - 1 - idx;
    const right = arr.length - 1 - left;
    return [...(new Array(left).fill('.')), ...cells, ...(new Array(right).fill('.'))];
}));
const diagonalLeftGrid = pivot(grid.map((cells, idx, arr) => {
    const right = arr.length - 1 - idx;
    const left = arr.length - 1 - right;
    return [...(new Array(left).fill('.')), ...cells, ...(new Array(right).fill('.'))];
}));

const leftToRight = grid.map(cells => [...cells.join('').matchAll(/XMAS/g)].length)
    .reduce((prev, curr) => prev + curr, 0);
const rightToLeft = grid.map(cells => [...cells.reverse().join('').matchAll(/XMAS/g)].length)
    .reduce((prev, curr) => prev + curr, 0);
const topToBottom = pivotGrid.map(cells => [...cells.join('').matchAll(/XMAS/g)].length)
    .reduce((prev, curr) => prev + curr, 0);
const bottomToTop = pivotGrid.map(cells => [...cells.reverse().join('').matchAll(/XMAS/g)].length)
    .reduce((prev, curr) => prev + curr, 0);
const upperLeftToBottomRight = diagonalRightGrid
    .map(cells => [...cells.join('').matchAll(/XMAS/g)].length)
    .reduce((prev, curr) => prev + curr, 0);
const bottomRightToUpperLeft = diagonalRightGrid
    .map(cells => [...cells.reverse().join('').matchAll(/XMAS/g)].length)
    .reduce((prev, curr) => prev + curr, 0);
const upperRightToBottomLeft = diagonalLeftGrid
    .map(cells => [...cells.join('').matchAll(/XMAS/g)].length)
    .reduce((prev, curr) => prev + curr, 0);
const bottomLeftToUpperRight = diagonalLeftGrid
    .map(cells => [...cells.reverse().join('').matchAll(/XMAS/g)].length)
    .reduce((prev, curr) => prev + curr, 0);

const sum = leftToRight + rightToLeft + topToBottom + bottomToTop +
    upperLeftToBottomRight + bottomRightToUpperLeft +
    upperRightToBottomLeft + bottomLeftToUpperRight;
console.log('Part 1');
console.log(sum);
