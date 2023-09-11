import fs from "fs";

class FilesMetadataService {
    GetFileSize(filePath: string): number {
        try {
            const fileStats = fs.statSync(filePath);
            return fileStats.size;
        } catch (error) {
            console.error(`Error getting file size.`);
            return -1; 
        }
    }

    GetFileDate(filePath: string): Date {
        try {
            const fileStats = fs.statSync(filePath);
            return fileStats.ctime;
        } catch (error) {
            console.error(`Error getting file date.`);
            return new Date("0000-00-00"); 
        }
    }
}

export default FilesMetadataService