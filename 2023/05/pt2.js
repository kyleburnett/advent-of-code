const fs = require('fs');

const sections = fs.readFileSync('input.txt', 'utf-8').trim().split('\n\n');
const seedLine = sections.shift();

// Construct maps
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

// Find minimum location
let minLocation = Infinity;
const seedTokens = seedLine.split(': ')[1].split(' ').map(num => parseInt(num, 10));
for (let i = 0; i < seedTokens.length; i += 2) {
    const start = seedTokens[i];
    const count = seedTokens[i + 1];
    console.log(`${i + 1} of ${seedTokens.length}`);
    for (let j = 0; j < count; ++j) {
        const seed = start + j;
        // console.log(`Seed ${seed}`);
        let current = seed;
        for (const map of maps) {
            let found = current;
            for (const rule of map.rules) {
                if (current >= rule.source && current < rule.source + rule.length) {
                    found = rule.destination + (current - rule.source);
                    break;
                }
            }
            // console.log(`  ${map.name} -> ${found}`);
            current = found;
        }
        // console.log();
        if (current < minLocation) {
            minLocation = current;
        }
    }
}
console.log('Part 2');
console.log(minLocation);
