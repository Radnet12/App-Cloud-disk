// Modules
const { Router } = require("express");

// Controllers
const FileController = require("../controllers/FileController");

// Middleware
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const router = new Router();

// Routes
router.post("/create", AuthMiddleware, FileController.createDir);
router.post("/upload", AuthMiddleware, FileController.uploadFile);
router.get("", AuthMiddleware, FileController.getFiles);

module.exports = router;
