const fs = require('fs');

const sum = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').filter(str => {
    // Rule 1
    let rule1 = false;
    for (let i = 0; i < str.length - 1; ++i) {
        const substr = str.substring(i, i + 2);
        if (str.includes(substr, i + 2)) {
            rule1 = true;
            break;
        }
    }

    // Rule 2
    let rule2 = false;
    for (let i = 0; i < str.length; ++i) {
        if (str[i] === str[i + 2]) {
            rule2 = true;
            break;
        }
    }

    return rule1 && rule2;
});
console.log('Part 1');
console.log(sum.length);
