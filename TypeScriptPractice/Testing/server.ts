import express, { Request, Response } from "express";
import FilesService from "./Services/Files/FilesService";

const server = express();

const port = 3000;
const path = "/home/username_user/Documents/Github/TSServer/TypeScriptPractice";
const fileService = new FilesService(path);

//get directories
server.get("/api/get/directories/*", async (req: Request, res: Response) => {
    const directoryPath: string = req.params[0];
    try {
        const directoryData = await fileService.GetDirectories(directoryPath);
        res.json(directoryData);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while getting files." });
    }
});

//delete directory
/*
server.delete("/api/delete/directories/:directoryName", async (req: Request, res: Response) => {
    try {
        const directoryName = req.params.directoryName;
        const success = await fileService.RemoveDirectory(directoryName);
    
        if (success) {
            res.json({ message: `${directoryName} directory has been deleted.` });
        } else {
            res.status(404).json({ error: `${directoryName} directory not found.` });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while deleting files." })
    }
});
*/


//get files
server.get("/api/get/files/*", async (req: Request, res: Response) => {
    const directoryPath: string = req.params[0];
    try {
        const filesData = await fileService.GetFiles(directoryPath);
        res.json(filesData);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while getting files." });
    }
});

//delete file
server.delete("/api/delete/files/:fileName", async (req: Request, res: Response) => {
    try {
        const fileName = req.params.fileName;
        const success = await fileService.RemoveFile(fileName);
    
        if (success) {
            res.json({ message: `${fileName} file has been deleted.` });
        } else {
            res.status(404).json({ error: `${fileName} file not found.` });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while deleting files." })
    }
});

server.get('*', (req, res) => {
    res.status(404).json({ error: "Route doesn't exist."})
});

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});


