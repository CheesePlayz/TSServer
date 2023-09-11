import { rejects } from "assert";
import fs from "fs";
import path, { resolve } from "path";
import FilesMetadataService from "./FilesMetadataService";
import { FileTypeEnum } from "../../DataModels/FileTypeEnum";
import FileDataModel from "../../DataModels/FileDataModel";
import { error } from "console";


const filesMetadataService = new FilesMetadataService

class FilesService {
    defaultPath: string;

    // used for caching the file path for deletion
    // scenario is like this: get the files, path is cached, delete if necessary.
    fullPath: string = ""

    constructor(defaultPathCtor: string) {
        this.defaultPath = defaultPathCtor;
    }

    GetDirectories(directoryPath: string){
        this.fullPath = path.join(this.defaultPath, directoryPath);
        return new Promise((resolve, reject) => {
            fs.readdir(this.fullPath, { withFileTypes: true }, (err, files) => {
                if (err) {
                    reject(err);
                } 
                else {
                    const directoryNames = files.filter(file => file.isDirectory()).map(file => file.name);
                    resolve(directoryNames);
                }
            });
        });
    }

    // One directory has a directory TestingRemoveDir, argument should be TestingRemoveDir
    // /api/delete/directories/TestingRemoveDir
    RemoveDirectory(directoryPath: string): Promise<boolean>{
        return new Promise((resolve, reject) => {
            fs.rm(path.join(this.fullPath, directoryPath), { recursive: true, force: true }, (err) => {
                if (err){
                    reject(err)
                }
                else {
                    resolve(true);
                }
            });
        });
    }

    GetFiles(directoryPath: string): Promise<FileDataModel[]> {
        this.fullPath = path.join(this.defaultPath, directoryPath);
        return new Promise((resolve, reject) => {
            fs.readdir(this.fullPath, { withFileTypes: true }, (err, files) => {
                if (err) {
                    reject(err);
                } 
                else {
                    let fileModels: FileDataModel[] = files.filter(file => file.isFile()).map(file => {
                        const fileModel = new FileDataModel;
                        fileModel.name = file.name;
                        fileModel.size = filesMetadataService.GetFileSize(path.join(this.fullPath, fileModel.name));
                        fileModel.type = FileTypeEnum.File;
                        fileModel.date = filesMetadataService.GetFileDate(path.join(this.fullPath, fileModel.name));
                        return fileModel;
                    });
                    resolve(fileModels);
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

