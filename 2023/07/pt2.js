const fs = require('fs');

const JRANKS = 'AKQT98765432J'; // 13
const TYPES = {
    FIVE_OF_A_KIND: 7,
    FOUR_OF_A_KIND: 6,
    FULL_HOUSE: 5,
    THREE_OF_A_KIND: 4,
    TWO_PAIR: 3,
    ONE_PAIR: 2,
    HIGH_CARD: 1
};

function handSorter(a, b) {
    const statsA = a.stats;
    const statsB = b.stats;
    if (statsA.type > statsB.type) {
        return -1;
    } else if (statsA.type < statsB.type) {
        return 1;
    } else {
        for (let i = 0; i < statsA.scores.length; ++i) {
            const scoreA = statsA.scores[i];
            const scoreB = statsB.scores[i];
            if (scoreA !== scoreB) {
                return scoreB - scoreA;
            }
        }
    }
}

function getJokerHandStats(hand) {
    const cardFrequencies = new Map();
    const cardScores = [];
    for (let i = 0; i < hand.length; ++i) {
        const card = hand[i];
        cardScores.push(13 - JRANKS.indexOf(card));
        cardFrequencies.set(card, (cardFrequencies.has(card) ? cardFrequencies.get(card) : 0) + 1);
    }
    const jokers = cardFrequencies.has('J') ? cardFrequencies.get('J') : 0;
    if (jokers > 0) {
        cardFrequencies.delete('J');
    }
    let type = null;
    const frequencies = jokers === 5 ? [0] : [...cardFrequencies].map(arr => arr[1]).sort((a, b) => b - a);
    frequencies[0] += jokers;
    if (frequencies[0] === 5) {
        type = TYPES.FIVE_OF_A_KIND;
    } else if (frequencies[0] === 4) {
        type = TYPES.FOUR_OF_A_KIND;
    } else if (frequencies[0] === 3) {
        if (frequencies[1] === 2) {
            type = TYPES.FULL_HOUSE;
        } else {
            type = TYPES.THREE_OF_A_KIND;
        }
    } else if (frequencies[0] === 2) {
        if (frequencies[1] === 2) {
            type = TYPES.TWO_PAIR;
        } else {
            type = TYPES.ONE_PAIR;
        }
    } else {
        type = TYPES.HIGH_CARD;
    }
    return {
        "scores": cardScores,
        "type": type
    };
}

const total = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map((line) => {
    const [hand, bidStr] = line.split(' ');
    return {
        "hand": hand,
        "stats": getJokerHandStats(hand),
        "bid": parseInt(bidStr)
    };
}).sort(handSorter).map(item => {
    // console.log(item.hand);
    return item;
}).reduce((prev, curr, index, arr) => {
    return prev + (curr.bid * (arr.length - index));
}, 0);
console.log('Part 2');
console.log(total);