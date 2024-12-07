const { readGrid } = require('../../utils');

const grid = readGrid('input.txt');
let direction = 'north';
let position = null;
const visited = new Set();
for (let i = 0; i < grid.length; ++i) {
    for (let j = 0; j < grid[i].length; ++j) {
        if (grid[i][j] === '^') {
            position = [i, j];
            break;
        }
    }
}
while (position[0] >= 0 && position[0] < grid.length &&
    position[1] >= 0 && position[1] < grid[0].length) {
    visited.add(`(${position[0]},${position[1]})`);
    if (direction === 'north') {
        position[0]--;
        if (grid[position[0] - 1] && grid[position[0] - 1][position[1]] === '#') {
            direction = 'east';
        }
    } else if (direction === 'east') {
        position[1]++;
        if (grid[position[0]] && grid[position[0]][position[1] + 1] === '#') {
            direction = 'south';
        }
    } else if (direction === 'south') {
        position[0]++;
        if (grid[position[0] + 1] && grid[position[0] + 1][position[1]] === '#') {
            direction = 'west';
        }
    } else {
        position[1]--;
        if (grid[position[0]] && grid[position[0]][position[1] - 1] === '#') {
            direction = 'north';
        }
    }
}

console.log('Part 1');
console.log(visited.size);
