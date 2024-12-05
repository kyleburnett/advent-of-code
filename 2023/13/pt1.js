const fs = require('fs');

// 012345678
// #.##..##.
// ..#.##.#.
// ##......#
// ##......#
// ..#.##.#.
// ..##..##.
// #.#.##.#.

// #...##..# 0
// #....#..# 1
// ..##..### 2
// #####.##. 3
// #####.##. 4
// ..##..### 5
// #....#..# 6

const sum = fs.readFileSync('input.txt', 'utf-8').trim().split('\n\n').map(pattern => {
    const grid = pattern.split('\n').map(line => line.split(''));
    const numCols = grid[0].length;
    // Check vertical reflection
    for (let i = 0; i < numCols - 1; ++i) {
        let mirror = true;
        outer: for (let j = 0; j < grid.length; ++j) {
            let a = i;
            let b = i + 1;
            while (a >= 0 && b < numCols) {
                if (grid[j][a] !== grid[j][b]) {
                    mirror = false;
                    break outer;
                }
                a--;
                b++;
            }
        }
        if (mirror) {
            return i + 1;
        }
    }
    // Check horizontal reflection
    for (let i = 0; i < grid.length - 1; ++i) {
        let mirror = true;
        outer: for (let j = 0; j < numCols; ++j) {
            let a = i;
            let b = i + 1;
            while (a >= 0 && b < grid.length) {
                if (grid[a][j] !== grid[b][j]) {
                    mirror = false;
                    break outer;
                }
                a--;
                b++;
            }
        }
        if (mirror) {
            return 100 * (i + 1);
        }
    }
}).reduce((prev, curr) => prev + curr, 0);
console.log('Part 1');
console.log(sum);
