const fs = require('fs');

const sum = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(line => {
    const nums = line.split(/\s+/).map(l => parseInt(l, 10));
    let type = null;
    for (let i = 1; i < nums.length; ++i) {
        if (Math.abs(nums[i] - nums[i - 1]) < 1 || Math.abs(nums[i] - nums[i - 1]) > 3) {
            return 0;
        } else if ((type === 'increasing' && nums[i] < nums[i - 1]) ||
            (type === 'decreasing' && nums[i] > nums[i - 1])) {
            return 0;
        } else if (type === null) {
            type = (nums[i] > nums[i - 1]) ? 'increasing' : 'decreasing';
        }
    }
    return 1;
}).reduce((prev, curr) => prev + curr, 0);
console.log('Part 1');
console.log(sum);
