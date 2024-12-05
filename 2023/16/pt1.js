const fs = require('fs');
const _ = require('lodash');

const grid = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(line => line.split(''));
const copy = _.cloneDeep(grid).map(row => row.map(_ => '.'));
const rowCount = grid.length;
const colCount = grid[0].length;
const visited = new Set();

function step(row, col, direction) {
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
            step(row, col, 'east');
        } else if (direction === 'east') {
            step(row, col, 'north');
        } else if (direction === 'south') {
            step(row, col, 'west');
        } else {
            step(row, col, 'south');
        }
    } else if (next === '\\') {
        if (direction === 'north') {
            step(row, col, 'west');
        } else if (direction === 'east') {
            step(row, col, 'south');
        } else if (direction === 'south') {
            step(row, col, 'east');
        } else {
            step(row, col, 'north');
        }
    } else if (next === '-') {
        if (direction === 'east' || direction === 'west') {
            step(row, col, direction);
        } else {
            step(row, col, 'east');
            step(row, col, 'west');
        }
    } else if (next === '|') {
        if (direction === 'north' || direction === 'south') {
            step(row, col, direction);
        } else {
            step(row, col, 'north');
            step(row, col, 'south');
        }
    } else {
        step(row, col, direction);
    }
}

step(0, -1, 'east');
console.log('Part 1');
console.log(copy.map(row => row.join('')).join('\n'));
console.log(copy.reduce((prev, curr) => {
    return prev + curr.reduce((prev, curr) => prev + (curr === '#' ? 1 : 0), 0);
}, 0));
