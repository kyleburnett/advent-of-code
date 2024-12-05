const fs = require('fs');

function memoize(func) {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        } else {
            const result = func(...args);
            cache.set(key, result);
            return result;
        }
    };
}

const countArrangements = memoize(function(springs, damaged) {
    if (springs.length === 0) {
        // If no available space:
        // - 0 if there are remaining damaged springs to assign
        // - 1 if there are no remaining damanged springs to assign
        return damaged.length > 0 ? 0 : 1;
    } else if (damaged.length === 0) {
        // If no damaged springs left to assign:
        // - 0 if there are damaged springs left unaccounted for
        // - 0 if there are no damaged springs left unaccounted for
        return springs.includes("#") ? 0 : 1;
    } else {
        let count = 0;
        const firstSpring = springs[0];
        // Count cases where first spring is not part of damaged segment
        if (firstSpring === "." || firstSpring === "?") {
            count += countArrangements(springs.slice(1), damaged);
        }
        // Count cases where first spring is part of damaged segment
        if (firstSpring === "#" || firstSpring === "?") {
            const [damagedLength, ...rest] = damaged;
            // Damaged segment fits, contains no operational springs, not followed by broken spring
            if (damagedLength <= springs.length &&
                !springs.slice(0, damagedLength).includes(".") &&
                (damagedLength === springs.length || springs[damagedLength] !== "#")) {
                count += countArrangements(springs.slice(damagedLength + 1), rest);
            }
        }
        return count;
    }
});

const sum = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(line => {
    const [springs, damagedStr] = line.split(' ');
    const damaged = damagedStr.split(',').map(num => parseFloat(num));
    const springsUnfolded = [springs, springs, springs, springs, springs].join("?");
    const damagedUnfolded = [...damaged, ...damaged, ...damaged, ...damaged, ...damaged];
    return countArrangements(springsUnfolded, damagedUnfolded);
}).reduce((prev, curr) => prev + curr, 0);
console.log('Part 2');
console.log(sum);
