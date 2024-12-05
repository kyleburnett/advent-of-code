const fs = require('fs');
const _ = require('lodash');

const GRID = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(line => line.split(''));

function step(grid, copy, visited, row, col, direction) {
    const rowCount = grid.length;
    const colCount = grid[0].length;
    if (direction === 'north') {
        row--;
    } else if (direction === 'east') {
        col++;
    } else if (direction === 'south') {
        row++;
    } else {
        col--;
    }
    if (row < 0 || row >= rowCount || col < 0 || col >= colCount) {
        return;
    }
    const key = `${row}-${col}-${direction}`;
    if (visited.has(key)) {
        return;
    }
    visited.add(key);
    copy[row][col] = '#';
    const next = grid[row][col];
    if (next === '/') {
        if (direction === 'north') {
            step(grid, copy, visited, row, col, 'east');
        } else if (direction === 'east') {
            step(grid, copy, visited, row, col, 'north');
        } else if (direction === 'south') {
            step(grid, copy, visited, row, col, 'west');
        } else {
            step(grid, copy, visited, row, col, 'south');
        }
    } else if (next === '\\') {
        if (direction === 'north') {
            step(grid, copy, visited, row, col, 'west');
        } else if (direction === 'east') {
            step(grid, copy, visited, row, col, 'south');
        } else if (direction === 'south') {
            step(grid, copy, visited, row, col, 'east');
        } else {
            step(grid, copy, visited, row, col, 'north');
        }
    } else if (next === '-') {
        if (direction === 'east' || direction === 'west') {
            step(grid, copy, visited, row, col, direction);
        } else {
            step(grid, copy, visited, row, col, 'east');
            step(grid, copy, visited, row, col, 'west');
        }
    } else if (next === '|') {
        if (direction === 'north' || direction === 'south') {
            step(grid, copy, visited, row, col, direction);
        } else {
            step(grid, copy, visited, row, col, 'north');
            step(grid, copy, visited, row, col, 'south');
        }
    } else {
        step(grid, copy, visited, row, col, direction);
    }
}

let max = 0;
// Left column
for (let i = 0; i < GRID.length; ++i) {
    const grid = _.cloneDeep(GRID);
    const copy = _.cloneDeep(grid).map(row => row.map(_ => '.'));
    const visited = new Set();

    step(grid, copy, visited, i, -1, 'east');

    // console.log(copy.map(row => row.join('')).join('\n'));
    const energized = copy.reduce((prev, curr) => {
        return prev + curr.reduce((prev, curr) => prev + (curr === '#' ? 1 : 0), 0);
    }, 0);
    if (energized > max) max = energized;
}
// Right column
for (let i = 0; i < GRID.length; ++i) {
    const grid = _.cloneDeep(GRID);
    const copy = _.cloneDeep(grid).map(row => row.map(_ => '.'));
    const visited = new Set();

    step(grid, copy, visited, i, GRID[0].length, 'west');

    // console.log(copy.map(row => row.join('')).join('\n'));
    const energized = copy.reduce((prev, curr) => {
        return prev + curr.reduce((prev, curr) => prev + (curr === '#' ? 1 : 0), 0);
    }, 0);
    if (energized > max) max = energized;
}
// Top row
for (let i = 0; i < GRID[0].length; ++i) {
    const grid = _.cloneDeep(GRID);
    const copy = _.cloneDeep(grid).map(row => row.map(_ => '.'));
    const visited = new Set();

    step(grid, copy, visited, -1, i, 'south');

    // console.log(copy.map(row => row.join('')).join('\n'));
    const energized = copy.reduce((prev, curr) => {
        return prev + curr.reduce((prev, curr) => prev + (curr === '#' ? 1 : 0), 0);
    }, 0);
    if (energized > max) max = energized;
}
// Bottom row
for (let i = 0; i < GRID[0].length; ++i) {
    const grid = _.cloneDeep(GRID);
    const copy = _.cloneDeep(grid).map(row => row.map(_ => '.'));
    const visited = new Set();

    step(grid, copy, visited, GRID.length, i, 'north');

    // console.log(copy.map(row => row.join('')).join('\n'));
    const energized = copy.reduce((prev, curr) => {
        return prev + curr.reduce((prev, curr) => prev + (curr === '#' ? 1 : 0), 0);
    }, 0);
    if (energized > max) max = energized;
}
console.log('Part 2');
console.log(max);
