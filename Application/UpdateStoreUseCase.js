const FileRepository = require('../Infrastructure/FileRepository');
const Cache = require("../Infrastructure/Cache");

class UpdateStoreUseCase {
    constructor(fileRepository, cache) {
        this.fileRepository = fileRepository;
        this.cache = cache;
    }

    async execute() {
        try {
            console.log('Updating store...');
            const allFinishedFiles = await this.fileRepository.allFinishedFiles();
            for (const file of allFinishedFiles) {
                if (!this.cache.get(file.fileId)) {
                    const fileWithMetadata = await this.fileRepository.getFileWithMetadata(file.fileId);
                    this.cache.set(file.fileId, fileWithMetadata);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new UpdateStoreUseCase(FileRepository, Cache);