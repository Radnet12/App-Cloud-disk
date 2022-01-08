// Modules
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/ApiError");

// Services
const AuthService = require("../services/AuthService");

class AuthController {
    async registration(req, res, next) {
        try {
            // @@Validation
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                next(
                    ApiError.BadRequest("Ошибка при валидации данных!", errors)
                );
            }
            // @@Validation

            // Getting data
            const { email, password } = req.body;

            const newUser = await AuthService.registration(email, password);

            return res.json(newUser);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            // Getting data
            const { email, password } = req.body;

            const data = await AuthService.login(email, password);

            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async authentication(req, res, next) {
        try {
            // Getting data
            const { id } = req.user;

            const data = await AuthService.authentication(id);

            return res.json(data);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new AuthController();
