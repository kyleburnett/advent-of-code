const fs = require('fs');
const _ = require('lodash');

const workflowRe = /([a-z]+)\{(.*)\}/;
const conditionRe = /([xmas])([<>])(\d+)/;
const partRe = /\{(.*)\}/;
const [workflowLines, partLines] = fs.readFileSync('input.txt', 'utf-8').trim().split('\n\n');
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
const parts = partLines.split('\n').map(line => {
    const partMatch = line.match(partRe);
    return partMatch[1].split(',').map(attribute => attribute.split('=')).reduce((prev, curr) => {
        prev[curr[0]] = parseInt(curr[1], 10);
        return prev;
    }, {});
});

function processPart(workflows, workflow, part) {
    let result;
    for (const rule of workflow.rules) {
        if (!rule.condition || (rule.condition.inequality === '<' &&
            part[rule.condition.attribute] < rule.condition.value) ||
            (rule.condition.inequality === '>' &&
                part[rule.condition.attribute] > rule.condition.value)) {
            result = rule.result;
            break;
        }
    }
    if (result === 'A' || result === 'R') {
        return result;
    } else {
        return processPart(workflows, _.find(workflows, ['name', result]), part);
    }
}

let sum = 0;
for (const part of parts) {
    const workflow = _.find(workflows, ['name', 'in']);
    const result = processPart(workflows, workflow, part);
    if (result === 'A') {
        sum += part.x + part.m + part.a + part.s;
    }
}

console.log('Part 1');
console.log(sum);
