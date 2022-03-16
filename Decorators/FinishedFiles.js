async function FinishedFiles (promise) {
    const p = await promise;

    return p.filter(file => file.processingStatus === "FINISHED");
}

module.exports = FinishedFiles;