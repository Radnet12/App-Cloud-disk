// Modules
const { Router } = require("express");
const { body } = require("express-validator");

// Controller
const AuthController = require("../controllers/AuthController");

// Middleware
const AuthMiddleware = require("../middlewares/AuthMiddleware");

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

router.post("/login", AuthController.login);
router.get("/authorization", AuthMiddleware, AuthController.authentication);

module.exports = router;
