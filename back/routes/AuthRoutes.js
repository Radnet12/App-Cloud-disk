// Modules
const { Router } = require("express");
const { body } = require("express-validator");

// Controller
const AuthController = require("../controllers/AuthController");

const router = new Router();

// Routes
router.post(
    "/registration",
    [
        body("email", "Некорректная почта!").isEmail(),
        body("password", "Некорректный пароль!").isLength({ min: 5, max: 32 }),
    ],
    AuthController.registration
);

module.exports = router;
