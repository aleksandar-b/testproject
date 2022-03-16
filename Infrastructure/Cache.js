const cache = require('memory-cache');

module.exports = {
    set: (id, data) => {
        console.log(`Cache: ${id} set`, Object.keys(data));
        cache.put(id, data);
    },
    get: (id) => cache.get(id),
};