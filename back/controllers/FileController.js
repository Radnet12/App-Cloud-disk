const path = require("path");
// Models
const FileModel = require("../models/FileModel");

// Services
const FileService = require("../services/FileService");

// Dtos
const FileDto = require("../dtos/FileDto");
const ApiError = require("../exceptions/ApiError");

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
                file.path = path.join(parentFile.path, file.name);
                await FileService.createDir(file);

                // saving file to parent children field
                parentFile.children.push(file.id);

                // saving parent file to DB
                await parentFile.save();
            }

            // saving file to DB
            await file.save();

            const fileDto = new FileDto(file);

            return res.json(fileDto);
        } catch (e) {
            next(e);
        }
    }

    async getFiles(req, res, next) {
        try {
            const files = await FileService.getFiles(
                req.user.id,
                req.query.id,
                req.query.sort
            );

            return res.json(files);
        } catch (e) {
            next(e);
        }
    }

    async uploadFile(req, res, next) {
        try {
            const file = await FileService.uploadFile(
                req.files.file,
                req.user.id,
                req.body.parent
            );

            return res.json(file);
        } catch (e) {
            next(e);
        }
    }

    async downloadFile(req, res, next) {
        try {
            const fileObject = await FileService.downloadFile(
                req.query.id,
                req.user.id
            );

            return res.download(fileObject.path, fileObject.name);
        } catch (e) {
            next(e);
        }
    }

    async deleteFile(req, res, next) {
        try {
            const deletedFile = await FileService.deleteFile(
                req.query.id,
                req.user.id
            );

            return res.json(deletedFile);
        } catch (e) {
            next(e);
        }
    }

    async searchFiles(req, res, next) {
        try {
            const files = await FileService.searchFiles(
                req.user.id,
                req.query.search
            );

            return res.json(files);
        } catch (e) {
            next(e);
        }
    }

    async uploadAvatar(req, res, next) {
        try {
            await FileService.uploadAvatar(req.user.id, req.files.file);

            return res.status(200);
        } catch (e) {
            next(e);
        }
    }

    async deleteAvatar(req, res, next) {
        try {
            const newUser = await FileService.deleteAvatar(req.user.id);

            return res.json(newUser);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new FileController();
