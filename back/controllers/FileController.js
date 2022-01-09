// Modules
const ApiError = require("../exceptions/ApiError");

// Models
const FileModel = require("../models/FileModel");

// Services
const FileService = require("../services/FileService");

class FileController {
    async createDir(req, res, next) {
        try {
            const { name, type, parent } = req.body;

            // Creating new file id DB
            const file = new FileModel({
                name,
                type,
                parent,
                user: req.user.id,
            });

            // Lookin fo parentFile
            const parentFile = await FileModel.findOne({ _id: parent });

            if (!parentFile) {
                file.path = name;
                await FileService.createDir(file);
            } else {
                file.path = `${parentFile.path}\\${file.name}`;
                await FileService.createDir(file);

                // saving file to parent children field
                parentFile.children.push(file.id);

                // saving parent file to DB
                await parentFile.save();
            }

            // saving file to DB
            await file.save();
            return res.json(file);
        } catch (e) {
            next(e);
        }
    }

    async getFiles(req, res, next) {
        try {
            const files = await FileService.getFiles(req.user.id, req.query.id);

            return res.json(files);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new FileController();
