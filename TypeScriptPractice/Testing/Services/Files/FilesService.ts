import { rejects } from "assert";
import fs from "fs";
import path, { resolve } from "path";
import FilesMetadataService from "./FilesMetadataService";
import { FileTypeEnum } from "../../DataModels/FileTypeEnum";
import FileDataModel from "../../DataModels/FileDataModel";


class FilesService {
    defaultPath: string;

    // used for caching the file path for deletion
    // scenario is like this: get the files, path is cached, delete if necessary.
    fullPath: string = ""

    constructor(defaultPathCtor: string) {
        this.defaultPath = defaultPathCtor;
    }

    GetDirectories(directoryPath: string){

    }

    RemoveDirectory(directoryPath: string){
        
    }

    GetFiles(directoryPath: string): Promise<string[]> {
        this.fullPath = path.join(this.defaultPath, directoryPath);
        return new Promise((resolve, reject) => {
            fs.readdir(this.fullPath, { withFileTypes: true }, (err, files) => {
                if (err) {
                    reject(err);
                } 
                else {
                    const fileNames = files.map(file => file.name);
                    resolve(fileNames);
                }
            });
        });
    }

    RemoveFile(fileName: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fs.unlink(path.join(this.fullPath, fileName), (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }
}

export default FilesService;

