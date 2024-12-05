const fs = require('fs');

function countCards(cards, start, end) {
    let count = 0;
    for (let i = start; i < end; ++i) {
        const scored = cards[i];
        if (scored > 0) {
            count += countCards(cards, i + 1, i + 1 + scored);
        }
        count++;
    }
    return count;
}

const cards = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map((line) => {
    const [cardInfo, cardNumbers] = line.split(': ');
    const [winningStr, playerStr] = cardNumbers.split(' | ');
    const winningNumbers = winningStr.trim().split(/ +/).map(num => parseInt(num, 10));
    const playerNumbers = playerStr.trim().split(/ +/).map(num => parseInt(num, 10));
    const scored = _.intersection(winningNumbers, playerNumbers);
    return scored.length;
});
const count = countCards(cards, 0, cards.length);
console.log('Part 2');
console.log(count);
