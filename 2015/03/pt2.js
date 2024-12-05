const fs = require('fs');
const _ = require('lodash');

const data = fs.readFileSync('input.txt', 'utf-8').trim();
const coordsSanta = [0, 0];
const coordsRobo = [0, 0];
const visitedSanta = [_.cloneDeep(coordsSanta)];
const visitedRobo = [_.cloneDeep(coordsRobo)];
for (let i = 0; i < data.length; i += 2) {
    const directionSanta = data[i];
    const directionRobo = data[i + 1];
    if (directionSanta === '>') {
        coordsSanta[0]++;
    } else if (directionSanta === '<') {
        coordsSanta[0]--;
    } else if (directionSanta === '^') {
        coordsSanta[1]++;
    } else {
        coordsSanta[1]--;
    }
    if (directionRobo === '>') {
        coordsRobo[0]++;
    } else if (directionRobo === '<') {
        coordsRobo[0]--;
    } else if (directionRobo === '^') {
        coordsRobo[1]++;
    } else {
        coordsRobo[1]--;
    }
    visitedSanta.push(_.cloneDeep(coordsSanta));
    visitedRobo.push(_.cloneDeep(coordsRobo));
}
console.log('Part 2');
console.log(_.uniqWith(visitedSanta.concat(visitedRobo), _.isEqual).length);
