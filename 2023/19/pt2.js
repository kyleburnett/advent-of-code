const fs = require('fs');
const _ = require('lodash');

const workflowRe = /([a-z]+)\{(.*)\}/;
const conditionRe = /([xmas])([<>])(\d+)/;
const [workflowLines, _partLines] = fs.readFileSync('test2.txt', 'utf-8').trim().split('\n\n');
const workflows = workflowLines.split('\n').map(line => {
    const workflowMatch = line.match(workflowRe);
    const name = workflowMatch[1];
    const rules = workflowMatch[2].split(',').map((rule, i, arr) => {
        if (i === arr.length - 1) {
            return {
                "result": rule
            };
        } else {
            const [condition, result] = rule.split(':');
            const conditionMatch = condition.match(conditionRe);
            return {
                "condition": {
                    "attribute": conditionMatch[1],
                    "inequality": conditionMatch[2],
                    "value": parseInt(conditionMatch[3], 10)
                },
                "result": result
            };
        }
    });
    return {
        "name": name,
        "rules": rules
    };
});

function applyCondition(range, condition) {
    let [min, max] = range[condition.attribute];
    let current = _.cloneDeep(range);
    let remainder = _.cloneDeep(range);
    if (condition.inequality === '<') {
        current[condition.attribute] = [min, condition.value - 1];
        remainder[condition.attribute] = [condition.value, max];
    } else {
        current[condition.attribute] = [condition.value + 1, max];
        remainder[condition.attribute] = [min, condition.value];
    }
    return [current, remainder];
}

function processRange(workflows, workflow, range) {
    let total = 0;
    let iter = range;
    for (const rule of workflow.rules) {
        console.log(rule);
        let remainder;
        if (rule.condition) {
            [iter, remainder] = applyCondition(iter, rule.condition);
        }
        if (rule.result === 'A') {
            const [xmin, xmax] = iter.x;
            const [mmin, mmax] = iter.m;
            const [amin, amax] = iter.a;
            const [smin, smax] = iter.s;
            total += (xmin > xmax ? 0 : xmax - xmin + 1) +
                (mmin > mmax ? 0 : mmax - mmin + 1) +
                (amin > amax ? 0 : amax - amin + 1) +
                (smin > smax ? 0 : smax - smin + 1);
        } else if (rule.result !== 'R') {
            total += processRange(workflows, _.find(workflows, ['name', rule.result]), iter);
        }
        iter = remainder;
    }
    return total;
}

const sum = processRange(workflows, _.find(workflows, ['name', 'in']), {
    x: [1, 4000],
    m: [1, 4000],
    a: [1, 4000],
    s: [1, 4000]
})

console.log('Part 2');
console.log(sum);
console.log(2000 * 4000 * 4000 * 4000 + 2000 * 50 * 3000 * 4000);
