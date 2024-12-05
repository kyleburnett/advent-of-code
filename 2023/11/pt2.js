const fs = require('fs');

const grid = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(line => line.split(''));

const galaxies = [];

// Find empty rows
const emptyRows = [];
for (let i = 0; i < grid.length; ++i) {
    let emptyRow = true;
    const row = grid[i];
    for (let j = 0; j < row.length; ++j) {
        if (row[j] === '#') {
            emptyRow = false;
            galaxies.push([i, j]);
        }
    }
    if (emptyRow) {
        emptyRows.push(i);
    }
}

// Find empty columns
const emptyCols = [];
for (let i = 0; i < grid[0].length; ++i) {
    let emptyCol = true;
    for (let j = 0; j < grid.length; ++j) {
        if (grid[j][i] === '#') {
            emptyCol = false;
            break;
        }
    }
    if (emptyCol) {
        emptyCols.push(i);
    }
}

const expansion = 1000000;
let total = 0;
for (let i = 0; i < galaxies.length; ++i) {
    const a = galaxies[i];
    for (let j = i + 1; j < galaxies.length; ++j) {
        const b = galaxies[j];
        const dist = Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + emptyRows.filter((rindex) => {
            return (a[0] < rindex && rindex < b[0]) || (b[0] < rindex && rindex < a[0]);
        }).length * (expansion - 1) + emptyCols.filter((cindex) => {
            return (a[1] < cindex && cindex < b[1]) || (b[1] < cindex && cindex < a[1]);
        }).length * (expansion - 1);
        total += dist;
    }
}

console.log('Part 2');
console.log(total);
