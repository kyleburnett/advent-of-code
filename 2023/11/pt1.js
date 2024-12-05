const fs = require('fs');

const grid = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(line => line.split(''));

// Find empty rows
const emptyRows = [];
for (let i = 0; i < grid.length; ++i) {
    let emptyRow = true;
    const row = grid[i];
    for (let j = 0; j < row.length; ++j) {
        if (row[j] === '#') {
            emptyRow = false;
            break;
        }
    }
    if (emptyRow) {
        emptyRows.unshift(i);
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
        emptyCols.unshift(i);
    }
}

// Expand columns
for (const i of emptyCols) {
    for (let j = 0; j < grid.length; ++j) {
        grid[j].splice(i, 0, '.');
    }
}

// Expand rows
for (const i of emptyRows) {
    grid.splice(i, 0, new Array(grid[0].length).fill('.'));
}

// Find galaxies
const galaxies = [];
for (let i = 0; i < grid.length; ++i) {
    const row = grid[i];
    for (let j = 0; j < row.length; ++j) {
        if (row[j] === '#') {
            galaxies.push([i, j]);
        }
    }
}

let total = 0;
for (let i = 0; i < galaxies.length; ++i) {
    const a = galaxies[i];
    for (let j = i + 1; j < galaxies.length; ++j) {
        const b = galaxies[j];
        const dist = Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
        console.log(dist);
        total += dist;
    }
}

console.log(grid.map(line => line.join('')).join('\n'));
console.log('Part 1');
console.log(total);
