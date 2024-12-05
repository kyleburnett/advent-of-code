const fs = require('fs');

exports.readGrid = function(path, fn) {
    return fs.readFileSync(path, 'utf-8').trim().split('\n').map(line => {
        return typeof fn === 'function' ? line.split('').map(fn) : line.split('');
    });
};

exports.memoize = function(func) {
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
};
