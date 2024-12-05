const fs = require('fs');

const sections = fs.readFileSync('input.txt', 'utf-8').trim().split('\n\n');
const seedLine = sections.shift();
const seeds = seedLine.split(': ')[1].split(' ').map(num => parseInt(num, 10));
const maps = [];
for (const section of sections) {
    const rules = [];
    lines = section.split('\n');
    header = lines.shift();
    const name = header.match(/(?:\w+)-to-(\w+)/)[1];
    for (const line of lines) {
        const [destination, source, length] = line.split(' ').map(num => parseInt(num, 10));
        rules.push({ destination, source, length });
        rules.sort((a, b) => a.source - b.source);
    }
    maps.push({ name, rules });
}
const locations = [];
for (const seed of seeds) {
    console.log(`Seed ${seed}`);
    let current = seed;
    for (const map of maps) {
        let found = current;
        for (const rule of map.rules) {
            if (current >= rule.source && current < rule.source + rule.length) {
                found = rule.destination + (current - rule.source);
                break;
            }
        }
        console.log(`  ${map.name} -> ${found}`);
        current = found;
    }
    console.log();
    locations.push(current);
}
console.log('Part 1');
console.log(Math.min(...locations));
