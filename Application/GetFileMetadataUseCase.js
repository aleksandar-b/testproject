const FileRepository = require('../Infrastructure/FileRepository');
const acl = require('../Config/acl');

function FileNotReadyError() {
    throw new Error("File is still being processed");
}

class GetFileMetadataUseCase {
    constructor(fileRepository) {
        this.fileRepository = fileRepository;
    }

    async execute(fileId, organizationId) {
        console.log('execute GetFileMetadataUseCase', fileId, organizationId);
        const canSee = acl.organization(organizationId).canSee('file', fileId);
        if (!canSee) {
            throw new Error("You don't have the right to read this file");
        }
        const file = await this.fileRepository.getFileWithMetadata(fileId);

        if(!file) {
            FileNotReadyError();
        }

        return file;
    }
}

module.exports = new GetFileMetadataUseCase(FileRepository);