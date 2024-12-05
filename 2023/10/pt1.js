const fs = require('fs');
const _ = require('lodash');

// | - L J 7 F
const lookup = {
    // If you're coming from the ___ and encounter ___, then ___
    "north": {
        "|": "south",
        "L": "east",
        "J": "west"
    },
    "east": {
        "-": "west",
        "L": "north",
        "F": "south"
    },
    "south": {
        "|": "north",
        "7": "west",
        "F": "east"
    },
    "west": {
        "-": "east",
        "J": "north",
        "7": "south"
    }
}
const grid = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');
const start = [];
for (let i = 0; i < grid.length; ++i) {
    const line = grid[i];
    const col = line.indexOf('S');
    if (col >= 0) {
        start.push(i, col);
        break;
    }
}
const iter = _.cloneDeep(start);
let from = null;
let count = 0;
do {
    if (from === null) {
        const [row, col] = iter;
        if (row - 1 >= 0 && '|7F'.indexOf(grid[row - 1][col]) >= 0) {
            iter[0]--;
            from = 'south';
        } else if (col + 1 < grid[0].length && '-J7'.indexOf(grid[row][col + 1]) >= 0) {
            iter[1]++;
            from = 'west';
        } else if (row + 1 < grid.length && '|LJ'.indexOf(grid[row + 1][col]) >= 0) {
            iter[0]++;
            from = 'north';
        } else {
            iter[1]--;
            from = 'east';
        }
    } else {
        const type = grid[iter[0]][iter[1]];
        const go = lookup[from][type];
        if (go === 'north') {
            iter[0]--;
            from = 'south';
        } else if (go === 'east') {
            iter[1]++;
            from = 'west';
        } else if (go === 'south') {
            iter[0]++;
            from = 'north';
        } else {
            iter[1]--;
            from = 'east';
        }
    }
    count++;
} while (grid[iter[0]][iter[1]] !== 'S');
console.log('Part 1');
console.log(count / 2);
