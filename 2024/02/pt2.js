const fs = require('fs');

function isSafe(nums) {
    let type = null;
    for (let i = 1; i < nums.length; ++i) {
        if (Math.abs(nums[i] - nums[i - 1]) < 1 || Math.abs(nums[i] - nums[i - 1]) > 3) {
            return false;
        } else if ((type === 'increasing' && nums[i] < nums[i - 1]) ||
            (type === 'decreasing' && nums[i] > nums[i - 1])) {
            return false;
        } else if (type === null) {
            type = (nums[i] > nums[i - 1]) ? 'increasing' : 'decreasing';
        }
    }
    return true;
}

const lines = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');
const safe = lines.filter(line => {
    const nums = line.split(/\s+/).map(l => parseInt(l, 10));
    if (isSafe(nums)) {
        return true;
    } else {
        for (let i = 0; i < nums.length; ++i) {
            if (isSafe(nums.toSpliced(i, 1))) {
                return true;
            }
        }
        return false;
    }
}).length;
console.log('Part 2');
console.log(safe);
