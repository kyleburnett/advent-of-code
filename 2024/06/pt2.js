const { readGrid } = require('../../utils');

function isLoopy(grid, position) {
    let direction = 'north';
    const visited = new Set();
    while (true) {
        if (visited.has(`(${position[0]},${position[1]})-${direction}`)) {
            // console.log(grid.map(row => row.join('')).join('\n'));
            // console.log(visited);
            // console.log();
            return true;
        } else {
            visited.add(`(${position[0]},${position[1]})-${direction}`);
        }
        const forward = structuredClone(position);
        if (direction === 'north') {
            forward[0]--;
        } else if (direction === 'east') {
            forward[1]++;
        } else if (direction === 'south') {
            forward[0]++;
        } else { // if (direction === 'west')
            forward[1]--;
        }
        if (forward[0] < 0 || forward[0] >= grid.length ||
            forward[1] < 0 || forward[1] >= grid[0].length) {
            // If moved off the grid, break out of loop because guard has exited grid
            break;
        } else if (grid[forward[0]][forward[1]] === '#') {
            // If there is something directly in front of you, turn right 90 degrees
            if (direction === 'north') {
                direction = 'east';
            } else if (direction === 'east') {
                direction = 'south'
            } else if (direction === 'south') {
                direction = 'west'
            } else { // if (direction === 'west')
                direction = 'north'
            }
        } else {
            // Otherwise, take a step forward.
            position[0] = forward[0];
            position[1] = forward[1];
        }
    }
    return false;
}

const grid = readGrid('input.txt');
let position = null;
for (let i = 0; i < grid.length; ++i) {
    for (let j = 0; j < grid[i].length; ++j) {
        if (grid[i][j] === '^') {
            position = [i, j];
            break;
        }
    }
}
let count = 0;
for (let i = 0; i < grid.length; ++i) {
    for (let j = 0; j < grid[i].length; ++j) {
        if (grid[i][j] !== '.') continue;
        const gridCopy = structuredClone(grid);
        gridCopy[i][j] = '#';
        const positionCopy = structuredClone(position);
        if (isLoopy(gridCopy, positionCopy)) {
            count++;
        }
    }
}

console.log('Part 2');
console.log(count);
// 2112 - too low
// 2113 - too low
// 2222 - too high
