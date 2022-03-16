async function Aggregate(promise) {
    const output = [];
    let offset = 0;
    let limit = 5;
    let response = await promise(offset, limit);
    output.push(...response);
    while (response.length === limit) {
        offset += limit;
        response = await promise(offset, limit);
        output.push(...response);
    }

    return output;
}

module.exports = Aggregate;