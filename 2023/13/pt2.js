const fs = require('fs');

const sum = fs.readFileSync('input.txt', 'utf-8').trim().split('\n\n').map(pattern => {
    const grid = pattern.split('\n').map(line => line.split(''));
    const numCols = grid[0].length;
    // Check vertical reflection
    for (let i = 0; i < numCols - 1; ++i) {
        let errors = 0;
        for (let j = 0; j < grid.length; ++j) {
            let a = i;
            let b = i + 1;
            while (a >= 0 && b < numCols) {
                if (grid[j][a] !== grid[j][b]) {
                    errors++;
                }
                a--;
                b++;
            }
        }
        if (errors === 1) {
            return i + 1;
        }
    }
    // Check horizontal reflection
    for (let i = 0; i < grid.length - 1; ++i) {
        let errors = 0;
        for (let j = 0; j < numCols; ++j) {
            let a = i;
            let b = i + 1;
            while (a >= 0 && b < grid.length) {
                if (grid[a][j] !== grid[b][j]) {
                    errors++;
                }
                a--;
                b++;
            }
        }
        if (errors === 1) {
            return 100 * (i + 1);
        }
    }
}).reduce((prev, curr) => prev + curr, 0);
console.log('Part 2');
console.log(sum);

