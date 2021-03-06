// Modules
const { Router } = require("express");

// Controllers
const FileController = require("../controllers/FileController");

// Middleware
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const router = new Router();

// Routes
router.post("/create", AuthMiddleware, FileController.createDir);
router.get("/download", AuthMiddleware, FileController.downloadFile);
router.delete("/delete", AuthMiddleware, FileController.deleteFile);
router.post("/upload", AuthMiddleware, FileController.uploadFile);
router.post("/avatar", AuthMiddleware, FileController.uploadAvatar);
router.delete("/avatar", AuthMiddleware, FileController.deleteAvatar);
router.get("/search", AuthMiddleware, FileController.searchFiles);
router.get("", AuthMiddleware, FileController.getFiles);

module.exports = router;
