const fs = require('fs');

// ['red', 'green', 'blue'];
const sum = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(line => {
    [info, game] = line.split(': ');
    const id = parseInt(info.split(' ')[1]);
    const lookup = {
        'red': 0,
        'green': 0,
        'blue': 0
    };
    game.split('; ').forEach(round => {
        round.split(', ').forEach(pull => {
            const [num, color] = pull.trim().split(' ');
            const value = parseInt(num);
            if (value > lookup[color]) {
                lookup[color] = value;
            }
        });
    });
    return lookup.red * lookup.green * lookup.blue;
}).reduce((prev, curr) => prev + curr, 0);
console.log('Part 2', sum);
