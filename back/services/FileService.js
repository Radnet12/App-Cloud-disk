// Modules
const fs = require("fs");

// Models
const FileModel = require("../models/FileModel");

// Exceptions
const ApiError = require("../exceptions/ApiError");

// DTO
const FileDto = require("../dtos/FileDto");

class FileService {
    createDir(file) {
        // Creating path to file
        const filePath = `${process.env.FILE_PATH}\\${file.user}\\${file.path}`;

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
            return ApiError.BadRequest("Не удалось получить файлы");
        }
    }
}

module.exports = new FileService();
