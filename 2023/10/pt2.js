const fs = require('fs');
const _ = require('lodash');

// | - L J 7 F
const directionLookup = {
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
const pipeLookup = {};
for (const dir in directionLookup) {
    pipeLookup[dir] = {};
    for (const pipe in directionLookup[dir]) {
        pipeLookup[dir][directionLookup[dir][pipe]] = pipe;
    }
}
const grid = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(line => line.split(''));
const start = [];
for (let i = 0; i < grid.length; ++i) {
    const line = grid[i];
    const col = line.indexOf('S');
    if (col >= 0) {
        start.push(i, col);
        break;
    }
}
const copy = _.cloneDeep(grid);
const iter = _.cloneDeep(start);
let firstDir = null;
let from = null;
let count = 0;
do {
    if (from === null) {
        const [row, col] = iter;
        if (row - 1 >= 0 && '|7F'.indexOf(grid[row - 1][col]) >= 0) {
            iter[0]--;
            from = 'south';
            firstDir = 'north';
        } else if (col + 1 < grid[0].length && '-J7'.indexOf(grid[row][col + 1]) >= 0) {
            iter[1]++;
            from = 'west';
            firstDir = 'east';
        } else if (row + 1 < grid.length && '|LJ'.indexOf(grid[row + 1][col]) >= 0) {
            iter[0]++;
            from = 'north';
            firstDir = 'south';
        } else {
            iter[1]--;
            from = 'east';
            firstDir = 'west';
        }
    } else {
        const type = grid[iter[0]][iter[1]];
        copy[iter[0]][iter[1]] = 'P';
        const go = directionLookup[from][type];
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
grid[iter[0]][iter[1]] = pipeLookup[firstDir][from];

let enclosed = 0;
for (let i = 0; i < grid.length; ++i) {
    const row = grid[i];
    for (let j = 0; j < row.length; ++j) {
        if (copy[i][j] === 'P' || copy[i][j] === 'S') continue;

        let crosses = 0;
        const state = {};
        for (let k = j + 1; k < row.length; ++k) {
            const test = row[k];
            if (copy[i][k] !== 'P' && copy[i][k] !== 'S') continue;
            if (test === '|') {
                crosses++;
            } else if (test === 'L') {
                state['L'] = true;
            } else if (test === '7') {
                if (state['L']) {
                    delete state['L'];
                    crosses++;
                } else {
                    delete state['F'];
                }
            } else if (test === 'F') {
                state['F'] = true;
            } else if (test === 'J') {
                if (state['F']) {
                    delete state['F'];
                    crosses++;
                } else {
                    delete state['L'];
                }
            }
        }
        if (crosses % 2 === 0) {
            copy[i][j] = 'O';
        } else {
            copy[i][j] = 'I';
            enclosed++;
        }
    }
}
console.log('Part 2');
// console.log(grid.map(line => line.join('')).join('\n'));
// console.log(copy.map(line => line.join('')).join('\n'));
console.log(enclosed);
