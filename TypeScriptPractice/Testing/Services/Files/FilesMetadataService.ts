import fs from "fs";

class FilesMetadataService {
    async GetFileSize(filePath: string): Promise<number> {
        try {
            const fileStats = await fs.promises.stat(filePath);
            return fileStats.size;
        } catch (error) {
            console.error(`Error getting file size.`);
            return -1; 
        }
    }

    async GetFileDate(filePath: string): Promise<Date> {
        try {
            const fileStats = await fs.promises.stat(filePath);
            return fileStats.birthtime;
        } catch (error) {
            console.error(`Error getting file date.`);
            return new Date("0000-00-00"); 
        }
    }
}

export default FilesMetadataService