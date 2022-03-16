const api = require("./SnackableAPI");
const Aggregate = require("../Decorators/Aggregate");
const Cache = require("./Cache");
const FinishedFiles = require("../Decorators/FinishedFiles");
const FindFile = require("../Decorators/FindFile");

const fileRepository = {
    findFinishedFile: async function (fileId) {
        return FindFile(await fileRepository.allFinishedFiles(), fileId);
    },
    allFinishedFiles: async function () {
        return FinishedFiles(Aggregate(api.all));
    },
    getFileWithMetadata: async (fileId) => {
        if(Cache.get(fileId)) {
            console.log('File found in cache...', fileId);
            return Cache.get(fileId);
        }

        const file = await fileRepository.findFinishedFile(fileId);
        const details = await api.details(fileId);
        const segments = await api.segments(fileId);

        const fileMetadata = {
            file: file,
            details: details,
            segments: segments
        };

        return fileMetadata;
    }
};

module.exports = fileRepository;