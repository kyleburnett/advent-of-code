const fs = require('fs');
const _ = require('lodash');

const data = fs.readFileSync('input.txt', 'utf-8').trim();
const coords = [0, 0];
const visited = [_.cloneDeep(coords)];
for (const direction of data) {
    if (direction === '>') {
        coords[0]++;
    } else if (direction === '<') {
        coords[0]--;
    } else if (direction === '^') {
        coords[1]++;
    } else {
        coords[1]--;
    }
    visited.push(_.cloneDeep(coords));
}
console.log('Part 1');
console.log(_.uniqWith(visited, _.isEqual).length);
