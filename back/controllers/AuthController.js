// Modules
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

// Models
const UserModel = require("../models/UserModel");

class AuthController {
    async registration(req, res) {
        try {
            // @@Validation
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: "Ошибка при валидации данных!", errors });
            }
            // @@Validation

            // Getting data
            const { email, password } = req.body;

            // Checking if such email is already exists or not
            const candidate = await UserModel.findOne({ email });

            if (candidate) {
                return res.status(400).json({
                    message: `Пользователь с адресной почтой ${email} уже существует!`,
                });
            }

            // Hashing password
            const hashedPassword = await bcrypt.hash(password, 15);

            // Saving to DB
            const newUser = new UserModel({ email, password: hashedPassword });
            await newUser.save();

            return res.json(newUser);
        } catch (e) {
            console.log("Ошибка:", e);
            res.json({ message: "Ошибка при регистрации!" });
        }
    }
}

module.exports = new AuthController();
