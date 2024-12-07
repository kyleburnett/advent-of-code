const fs = require('fs');

const [rulesStr, updatesStr] = fs.readFileSync('input.txt', 'utf-8').trim().split('\n\n');
const rules = rulesStr.split('\n').map(line => line.split('|').map(val => parseInt(val, 10)))
    .reduce((prev, curr) => {
        if (!prev[curr[0]]) {
            prev[curr[0]] = new Set();
        }
        prev[curr[0]].add(curr[1]);
        return prev;
    }, {});
const updates = updatesStr.split('\n').map(line => line.split(',').map(val => parseInt(val, 10)));
const sum = updates.filter((update) => {
    for (let i = 0; i < update.length; ++i) {
        for (let j = i + 1; j < update.length; ++j) {
            if (rules[update[j]] && rules[update[j]].has(update[i])) {
                return true;
            }
        }
    }
    return false;
}).map((update) => {
    for (let i = 0; i < update.length; ++i) {
        for (let j = i + 1; j < update.length; ++j) {
            if (rules[update[j]] && rules[update[j]].has(update[i])) {
                const temp = update[i];
                update[i] = update[j];
                update[j] = temp;
            }
        }
    }
    return update;
}).map((update) => update[(update.length - 1) / 2]).reduce((prev, curr) => prev + curr, 0);
console.log('Part 2');
console.log(sum);
