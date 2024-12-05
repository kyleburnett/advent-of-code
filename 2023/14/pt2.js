const fs = require('fs');

// O....#....
// O.OO#....#
// .....##...
// OO.#O....O
// .O.....O#.
// O.#..O.#.#
// ..O..#O..O
// .......O..
// #....###..
// #OO..#....

function pivot(grid) {
    const pivoted = [];
    const COLS = grid[0].length;
    for (let i = 0; i < COLS; ++i) {
        const row = [];
        for (let j = 0; j < grid.length; ++j) {
            row.push(grid[j][i]);
        }
        pivoted.push(row);
    }
    return pivoted;
}

function roll(grid, direction) {
    for (let i = 0; i < grid.length; ++i) {
        grid[i] = grid[i].join('')
            .split('#')
            .map(part => part.split('').sort(getSorter(direction)).join(''))
            .join('#')
            .split('');
    }
}

function getSorter(direction) {
    if (direction === 'west' || direction === 'north') {
        return (a, b) => b.localeCompare(a);
    } else {
        return (a, b) => a.localeCompare(b);
    }
}

function getLoad(grid) {
    let sum = 0;
    let cost = grid.length;
    for (const row of grid) {
        for (const cell of row) {
            if (cell === 'O') {
                sum += cost;
            }
        }
        cost--;
    }
    return sum;
}

let grid = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(line => line.split(''));
const gridToIndex = new Map();
const loads = [];
const CYCLES = 1000000000;
for (let i = 0; i < CYCLES; ++i) {
    // North
    grid = pivot(grid);
    roll(grid, 'north');
    grid = pivot(grid);

    // West
    roll(grid, 'west');

    // South
    grid = pivot(grid);
    roll(grid, 'south');
    grid = pivot(grid);

    // East
    roll(grid, 'east');
    const final = grid.map(row => row.join('')).join('\n');
    if (gridToIndex.has(final)) {
        const index = gridToIndex.get(final);
        const offset = (CYCLES - (index + 1)) % (i - index);
        console.log('Part 2');
        console.log(loads[index + offset]);
        break;
    } else {
        gridToIndex.set(final, i);
        loads.push(getLoad(grid));
    }
}
