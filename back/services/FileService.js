// Modules
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

// Models
const FileModel = require("../models/FileModel");
const UserModel = require("../models/UserModel");

// Exceptions
const ApiError = require("../exceptions/ApiError");

// DTO
const FileDto = require("../dtos/FileDto");
const UserDto = require("../dtos/UserDto");

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

    async getFiles(userId, parentId, sortType) {
        try {
            const files = await FileModel.find({
                user: userId,
                parent: parentId,
            }).sort({ [sortType]: 1 });

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
        let pathToTheServer;
        let filePath = file.name;

        // If parent dir exist create file in this dir
        if (parent) {
            pathToTheServer = this.#returnFilePath(
                userId,
                parent.path,
                file.name
            );
            filePath = path.join(parent.path, file.name);
        } else {
            pathToTheServer = this.#returnFilePath(userId, file.name);
        }

        // Checking if such dir already exist
        if (fs.existsSync(pathToTheServer)) {
            throw ApiError.BadRequest(`Файл "${file.name}" уже существует!`);
        }

        // Moving file to cloud
        await file.mv(pathToTheServer);

        // Getting file type
        const fileType = file.name.split(".").pop();

        // Creting new file
        const fileModel = new FileModel({
            name: file.name,
            type: fileType,
            size: file.size,
            path: filePath,
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
        // Looking for file according to his id and user id
        const file = await FileModel.findOne({ _id: fileId, user: userId });

        // if such file was not founded, throw error
        if (!file) {
            throw ApiError.BadRequest("Не удалось найти файл!");
        }

        const path = this.#returnFilePath(userId, file.path);
        console.log("path", path);

        if (!fs.existsSync(path)) {
            throw ApiError.BadRequest("Файл не найден!");
        }

        return {
            path,
            name: file.name,
        };
    }

    async deleteFile(fileId, userId) {
        // Looking for file according to his id and user id
        const file = await FileModel.findOne({ _id: fileId, user: userId });

        // if such file was not founded, throw error
        if (!file) {
            throw ApiError.BadRequest("Не удалось найти файл!");
        }

        // Checing if such file or dir exist
        if (!fs.existsSync(this.#returnFilePath(userId, file.path))) {
            if (file.type === "dir") {
                throw ApiError.BadRequest("Папка не найдена!");
            } else {
                throw ApiError.BadRequest("Файл не найден!");
            }
        }

        // Deleting file or directory from the server
        try {
            if (file.type === "dir") {
                this.#recursivDeleting(this.#returnFilePath(userId, file.path));
            } else {
                fs.unlinkSync(this.#returnFilePath(userId, file.path));
            }
        } catch (e) {
            console.log("Ошибка при удалении: ", e);
            throw ApiError.BadRequest("Папка не пустая!");
        }

        // deleting file from DB
        await file.remove();

        const fileDto = new FileDto(file);

        return fileDto;
    }

    async searchFiles(userId, search) {
        let files = await FileModel.find({ user: userId });

        files = files.filter((file) => file.name.includes(search));

        const filesDto = files.map((file) => new FileDto(file));

        return filesDto;
    }

    async uploadAvatar(userId, file) {
        const user = await UserModel.findById(userId);

        // Creating name for avatar
        const avatarName = uuid.v4() + ".jpg";

        file.mv(
            path.join(
                __dirname,
                `../${process.env.STATIC_DIR_NAME}`,
                avatarName
            )
        );

        user.avatar = avatarName;

        await user.save();

        return;
    }

    async deleteAvatar(userId) {
        const user = await UserModel.findById(userId);

        if (!user.avatar) {
            throw ApiError.BadRequest("У Вас нет изображения");
        }

        fs.unlinkSync(
            path.join(
                __dirname,
                `../${process.env.STATIC_DIR_NAME}`,
                user.avatar
            )
        );

        user.avatar = null;
        await user.save();

        return new UserDto(user);
    }

    #returnFilePath(userId, ...rest) {
        return path.join(
            __dirname,
            `../${process.env.FILE_DIR_NAME}`,
            userId,
            ...rest
        );
    }

    #recursivDeleting(filePath) {
        let files = [];

        files = fs.readdirSync(filePath);
        files.forEach((file) => {
            let curPath = path.join(filePath, file);

            if (fs.statSync(curPath).isDirectory()) {
                this.#recursivDeleting(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(filePath);
    }
}

module.exports = new FileService();
