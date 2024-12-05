const fs = require('fs');

const DIGITS = new Map();
DIGITS.set('1', 1);
DIGITS.set('2', 2);
DIGITS.set('3', 3);
DIGITS.set('4', 4);
DIGITS.set('5', 5);
DIGITS.set('6', 6);
DIGITS.set('7', 7);
DIGITS.set('8', 8);
DIGITS.set('9', 9);
DIGITS.set('one', 1);
DIGITS.set('two', 2);
DIGITS.set('three', 3);
DIGITS.set('four', 4);
DIGITS.set('five', 5);
DIGITS.set('six', 6);
DIGITS.set('seven', 7);
DIGITS.set('eight', 8);
DIGITS.set('nine', 9);

const sum = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map((line) => {
    let first, last;
    outer1: for (let i = 0; i < line.length; ++i) {
        for (const [digit, value] of DIGITS.entries()) {
            const num = line.substring(i, i + digit.length);
            if (num === digit) {
                first = value;
                break outer1;
            }
        }
    }
    outer2: for (let i = line.length - 1; i >= 0; --i) {
        for (const [digit, value] of DIGITS.entries()) {
            const num = line.substring(i, i + digit.length);
            if (num === digit) {
                last = value;
                break outer2;
            }
        }
    }
    return first * 10 + last;
}).reduce((prev, curr) => prev + curr, 0);
console.log(sum);
