// Modules
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ApiError = require("../../../04_Advanced-auth/back/exceptions/ApiError");

// Dtos
const UserDto = require("../dtos/UserDto");

// Models
const UserModel = require("../models/UserModel");
const FileModel = require("../models/FileModel");

// Services
const FileService = require("./FileService");

class AuthService {
    async registration(email, password) {
        // Checking if such email is already exists or not
        const candidate = await UserModel.findOne({ email });

        if (candidate) {
            throw ApiError.BadRequest(
                `Пользователь с адресной почтой ${email} уже существует!`
            );
        }

        // Hashing password
        const hashedPassword = await bcrypt.hash(password, 8);

        // Saving to DB
        const newUser = await UserModel.create({
            email,
            password: hashedPassword,
        });

        // Creating dir for user
        await FileService.createDir(
            new FileModel({ user: newUser.id, name: "" })
        );

        // Generating JWT
        const token = jwt.sign(
            { id: newUser.id },
            process.env.JWT_ACCESS_SECRET_KEY,
            { expiresIn: "1h" }
        );

        // Excluding from user password field
        const userDto = new UserDto(newUser);

        return { token, user: userDto };
    }

    async login(email, password) {
        // Checking if such email is already exists or not
        const user = await UserModel.findOne({ email });

        // if no, send error
        if (!user) {
            throw ApiError.BadRequest(
                `Пользователь с адресной почтой ${email} не найден!`
            );
        }

        // Comparing paswords
        const isPasswordEqual = await bcrypt.compare(password, user.password);

        // if not equal, send error
        if (!isPasswordEqual) {
            throw ApiError.BadRequest("Неправильный пароль!");
        }

        // Generating JWT
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_ACCESS_SECRET_KEY,
            { expiresIn: "1h" }
        );

        // Excluding from user password field
        const userDto = new UserDto(user);

        return { token, user: userDto };
    }

    async authentication(id) {
        // Checking if such email is already exists or not
        const user = await UserModel.findOne({ _id: id });

        // Generating JWT
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_ACCESS_SECRET_KEY,
            { expiresIn: "1h" }
        );

        // Excluding from user password field
        const userDto = new UserDto(user);

        return { token, user: userDto };
    }
}

module.exports = new AuthService();
