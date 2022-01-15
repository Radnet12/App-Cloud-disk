// Modules
const fs = require("fs");
const path = require("path");

// Models
const FileModel = require("../models/FileModel");
const UserModel = require("../models/UserModel");

// Exceptions
const ApiError = require("../exceptions/ApiError");

// DTO
const FileDto = require("../dtos/FileDto");

class FileService {
    createDir(file) {
        const filePath = this.#returnFilePath(`${file.user}`, file.path);

        return new Promise((resolve, reject) => {
            try {
                // If no such dir on filePath creating dir
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath);
                    return resolve({ message: "Папка была создана успешно!" });
                } else {
                    return reject(
                        ApiError.BadRequest("Данная папка уже существует!")
                    );
                }
            } catch (e) {
                console.log("Ошибка при создании папки: ", e);
                return reject(ApiError.BadRequest("Не удалось создать папку"));
            }
        });
    }

    async getFiles(userId, parentId) {
        try {
            const files = await FileModel.find({
                user: userId,
                parent: parentId,
            });

            const filesDto = files.map((file) => new FileDto(file));

            return filesDto;
        } catch (e) {
            console.log("Ошибка при получении файлов: ", e);
            throw ApiError.BadRequest("Не удалось получить файлы");
        }
    }

    async uploadFile(file, userId, parentId) {
        // Finding dir accoring to UserId and dirId
        const parent = await FileModel.findOne({
            user: userId,
            _id: parentId,
        });

        // Finding user
        const user = await UserModel.findById(userId);

        // Checking for empty space
        if (user.usedSpace + file.size > user.diskSpace) {
            throw ApiError.BadRequest("Недостаточно места на Вашем хранилище!");
        }

        // Adding size to existing one
        user.usedSpace = user.usedSpace + file.size;

        // Getting path
        let path;

        // If parent dir exist create file in this dir
        if (parent) {
            // path = path.join(filePath, userId, parent.path, file.name);
            path = this.#returnFilePath(userId, parent.path, file.name);
        } else {
            // path = path.join(filePath, userId, file.name);
            path = this.#returnFilePath(userId, file.name);
        }

        // Checking if such dir already exist
        if (fs.existsSync(path)) {
            throw ApiError.BadRequest(`Файл "${file.name}" уже существует!`);
        }

        // Moving file to cloud
        await file.mv(path);

        // Getting file type
        const fileType = file.name.split(".").pop();

        // Creting new file
        const fileModel = new FileModel({
            name: file.name,
            type: fileType,
            size: file.size,
            path: parent?.path,
            parent: parent?._id,
            user: user._id,
        });

        // Saving to DB
        await fileModel.save();
        await user.save();

        // Getting file from DB
        const fileModelFromDB = await FileModel.findOne({
            name: file.name,
            type: fileType,
        });

        const fileDto = new FileDto(fileModelFromDB);

        return fileDto;
    }

    async downloadFile(fileId, userId) {
        const file = await FileModel.findOne({ _id: fileId, user: userId });

        if (!file) {
            throw ApiError.BadRequest("Не удалось найти файл");
        }

        const path = this.#returnFilePath(userId, file.path, file.name);

        if (!fs.existsSync(path)) {
            throw ApiError.BadRequest("Файл не найден");
        }

        return {
            path,
            name: file.name,
        };
    }

    #returnFilePath(userId, ...rest) {
        return path.join(
            __dirname,
            `../${process.env.FILE_DIR_NAME}`,
            userId,
            ...rest
        );
    }
}

module.exports = new FileService();
