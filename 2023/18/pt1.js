const fs = require('fs');
const _ = require('lodash');

const re = /([URDL]) (\d+) \(#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})\)/
const lines = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');
let row = 0;
let col = 0;
let rowMin = 0;
let colMin = 0;
let rowMax = 0;
let colMax = 0;

// Find trench
const trench = [];
trench.push([row, col]);
for (const line of lines) {
    const matches = line.match(re);
    const direction = matches[1];
    const count = matches[2];
    for (let i = 0; i < count; ++i) {
        if (direction === 'U') {
            row--;
        } else if (direction === 'R') {
            col++;
        } else if (direction === 'D') {
            row++;
        } else {
            col--;
        }
        if (row < rowMin) {
            rowMin = row;
        }
        if (col < colMin) {
            colMin = col;
        }
        if (row > rowMax) {
            rowMax = row;
        }
        if (col > colMax) {
            colMax = col;
        }
        if (row !== 0 || col !== 0) {
            trench.push([row, col]);
        }
    }
}

// Find normalization figures
const rowNormalization = 0 - rowMin;
const colNormalization = 0 - colMin;
rowMax += rowNormalization;
colMax += colNormalization;

// Create grid
grid = [];
for (let i = 0; i < rowMax + 1; ++i) {
    const row = [];
    for (let j = 0; j < colMax + 1; ++j) {
        row.push('.');
    }
    grid.push(row);
}

for (const coords of trench) {
    // Normalize
    coords[0] += rowNormalization;
    coords[1] += colNormalization;

    // Paint grid
    grid[coords[0]][coords[1]] = '#';
}

for (let i = 1; i < grid.length - 1; ++i) {
    const top = {
        inside: false,
        pos: null
    };
    const middle = {
        inside: false,
        pos: null
    };
    const bottom = {
        inside: false,
        pos: null
    };
    for (let j = 0; j < grid[i].length; ++j) {
        if (grid[i - 1][j] === '#') {
        }
    }
}

// const copy = _.cloneDeep(grid);

// let trenchCount = 0;
// for (let i = 0; i < grid.length; ++i) {
//     for (let j = 0; j < grid[i].length; ++j) {
//         if (grid[i][j] === '#') continue;

//         let outside = false;
//         // Go up
//         if (!outside) {
//             let iter = i - 1;
//             let foundTrench = false;
//             while (iter >= 0) {
//                 if (grid[iter][j] === '#') {
//                     foundTrench = true;
//                     break;
//                 }
//                 iter--;
//             }
//             if (!foundTrench) {
//                 outside = true;
//             }
//         }
//         // Go right
//         if (!outside) {
//             let iter = j + 1;
//             let foundTrench = false;
//             while (iter < grid[i].length) {
//                 if (grid[i][iter] === '#') {
//                     foundTrench = true;
//                     break;
//                 }
//                 iter++;
//             }
//             if (!foundTrench) {
//                 outside = true;
//             }
//         }
//         // Go down
//         if (!outside) {
//             let iter = i + 1;
//             let foundTrench = false;
//             while (iter < grid.length) {
//                 if (grid[iter][j] === '#') {
//                     foundTrench = true;
//                     break;
//                 }
//                 iter++;
//             }
//             if (!foundTrench) {
//                 outside = true;
//             }
//         }
//         // Go left
//         if (!outside) {
//             let iter = j - 1;
//             let foundTrench = false;
//             while (iter >= 0) {
//                 if (grid[i][iter] === '#') {
//                     foundTrench = true;
//                     break;
//                 }
//                 iter--;
//             }
//             if (!foundTrench) {
//                 outside = true;
//             }
//         }

//         if (!outside) {
//             copy[i][j] = '#';
//             trenchCount++;
//         }
//     }
// }

// console.log(grid.map(row => row.join('')).join('\n'));
// console.log();
// console.log(copy.map(row => row.join('')).join('\n'));
// console.log();

// console.log('Part 1');
// console.log(trench.length + trenchCount);

// 41494 too high
