function FindFile (items, id) {
    return items.find(file => file.fileId === id);
}

module.exports = FindFile;