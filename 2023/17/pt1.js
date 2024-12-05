const fs = require('fs');
const _ = require('lodash');

class Vertex {
    row;
    col;
    maxRows;
    maxCols;
    cost;

    constructor(row, col, maxRows, maxCols, cost) {
        this.row = row;
        this.col = col;
        this.maxRows = maxRows;
        this.maxCols = maxCols;
        this.cost = cost;
    }

    getNeighbor(vertices, direction) {
        let row = this.row;
        let col = this.col;
        if (direction === 'north') {
            row--;
        } else if (direction === 'east') {
            col++;
        } else if (direction === 'south') {
            row++;
        } else {
            col--;
        }
        return [vertices[row][col], direction];
    }

    getNeighbors(vertices, previous) {
        let iter = this;
        const directions = [];
        for (let i = 0; i < 3; ++i) {
            const [vertex, direction] = previous.get(iter);
            if (!vertex) break;
            directions.push(direction);
            iter = vertex;
        }
        const neighbors = [];
        const lastDirection = directions[0] || null;
        if (this.row > 0 && (lastDirection === 'west' || lastDirection === 'east')) {
            neighbors.push(this.getNeighbor(vertices, 'north'));
        }
        if (this.col < this.maxCols - 1 &&
            (lastDirection === 'north' || lastDirection === 'south' || lastDirection === null)) {
            neighbors.push(this.getNeighbor(vertices, 'east'));
        }
        if (this.row < this.maxRows - 1 &&
            (lastDirection === 'east' || lastDirection === 'west' || lastDirection === null)) {
            neighbors.push(this.getNeighbor(vertices, 'south'));
        }
        if (this.col > 0 &&
            (lastDirection === 'south' || lastDirection === 'north')) {
            neighbors.push(this.getNeighbor(vertices, 'west'));
        }
        const tipLimitReached = directions.length === 3 && directions[0] === directions[1] &&
            directions[1] === directions[2] && directions[2] === directions[0];
        if (!tipLimitReached && directions.length > 0 &&
            ((lastDirection === 'north' && this.row > 0) ||
                (lastDirection === 'east' && this.col < this.maxCols) ||
                (lastDirection === 'south' && this.row < this.maxRows - 1) ||
                (lastDirection === 'west' && this.col > 0))) {
            neighbors.push(this.getNeighbor(vertices, lastDirection));
        }
        return neighbors;
    }
}

const grid = fs.readFileSync('test.txt', 'utf-8').trim().split('\n').map((line, i, lines) => {
    return line.split('').map((val, j, cells) => {
        return new Vertex(i, j, lines.length, cells.length, parseInt(val));
    });
});
const distances = new Map();
const previous = new Map();
const Q = new Set();
const source = grid[0][0];
const target = grid[source.maxRows - 1][source.maxCols - 1];

for (let i = 0; i < grid.length; ++i) {
    for (let j = 0; j < grid[i].length; ++j) {
        const vertex = grid[i][j];
        distances.set(vertex, Infinity);
        previous.set(vertex, [undefined, undefined]);
        Q.add(vertex);
    }
}
distances.set(source, 0);

while (Q.size > 0) {
    // Select vertex with minimum distance
    let minDistance = Infinity;
    let minVertex = null;
    for (const vertex of Q) {
        const distance = distances.get(vertex);
        if (distance < minDistance) {
            minDistance = distance;
            minVertex = vertex;
        }
    }
    if (minVertex === target) {
        break;
    }
    Q.delete(minVertex);

    // Get neighbors of selected vertex
    const neighbors = minVertex.getNeighbors(grid, previous);
    for (const [neighbor, direction] of neighbors) {
        if (Q.has(neighbor)) {
            const altDistance = minDistance + neighbor.cost;
            if (altDistance < distances.get(neighbor)) {
                distances.set(neighbor, altDistance);
                previous.set(neighbor, [minVertex, direction]);
            }
        }
    }
}

const sequence = [];
let iter = target;
let sum = 0;
while (true) {
    sequence.unshift(iter);
    sum += iter.cost;
    const [vertex, _direction] = previous.get(iter);
    if (vertex === source) break;
    iter = vertex;
}

console.log(sequence);

console.log('Part 1');
console.log(sum);
