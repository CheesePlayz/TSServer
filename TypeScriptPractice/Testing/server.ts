import express, { Request, Response } from "express";
import FilesService from "./Services/Files/FilesService";

const server = express();

const port = 3000;
const path = "/home/username_user/Documents/TypeScriptPractice";
const fileService = new FilesService(path);


//get directories


//delete directories



//get files
server.get("/api/get/*", async (req: Request, res: Response) => {
    const directoryPath: string = req.params[0];
    try {
        const filesData = await fileService.GetFiles(directoryPath);
        res.json(filesData);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while getting files." });
    }
});

//delete files
server.delete("/api/delete/:fileName", async (req: Request, res: Response) => {
    try {
        const fileName = req.params.fileName;
        const success = await fileService.RemoveFile(fileName);
    
        if (success) {
            res.json({ message: `${fileName} has been deleted.` });
        } else {
            res.status(404).json({ error: `${fileName} not found.` });
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


