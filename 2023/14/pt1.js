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

const grid = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(line => line.split(''));
const cols = grid[0].length;
let sum = 0;
for (let i = 0; i < cols; ++i) {
    let rollPos = grid.length;
    for (let j = 0; j < grid.length; ++j) {
        const item = grid[j][i];
        if (item === 'O') {
            sum += rollPos--;
        } else if (item === '#') {
            rollPos = grid.length - j - 1;
        }
    }
}
console.log('Part 1');
console.log(sum);
