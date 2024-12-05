const fs = require('fs');

const sum = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').filter(str => {
    // Rule 1
    const matches = str.matchAll(/[aeiou]/g);
    if (Array.from(matches).length < 3) return false;

    // Rule 2
    let repeat = false;
    let last = null;
    for (let i = 0; i < str.length; ++i) {
        if (last === str[i]) {
            repeat = true;
            break;
        } else {
            last = str[i];
        }
    }
    if (!repeat) return false;

    // Rule 3
    const forbidden = ["ab", "cd", "pq", "xy"];
    for (const substr of forbidden) {
        if (str.includes(substr)) return false;
    }

    return true;
});
console.log('Part 1');
console.log(sum.length);
